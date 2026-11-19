import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Falta session_id' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe no configurado' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const isPaid = session.payment_status === 'paid' || session.status === 'complete';
    const planType = session.metadata?.planType || (session.amount_total === 1320 ? 'escuela_10usd' : 'docente_5usd');
    const userEmail = session.customer_details?.email || session.metadata?.userEmail || '';
    const userId = session.client_reference_id || session.metadata?.userId || 'user-unknown';
    const amountUsd = (session.amount_total || 665) / 100;

    const renewsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Registrar en Supabase si está disponible
    try {
      if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
        await supabaseAdmin.from('subscriptions').insert([
          {
            user_id: userId,
            user_email: userEmail,
            plan_type: planType,
            amount_usd: amountUsd,
            status: 'activo',
            stripe_session_id: sessionId,
            stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
            renews_at: renewsAt
          }
        ]);
      }
    } catch (dbErr) {
      console.warn('Advertencia al registrar en Supabase subscriptions:', dbErr);
    }

    return NextResponse.json({
      success: true,
      isPaid,
      planType,
      userEmail,
      amountUsd,
      renewsAt,
      stripeSubscriptionId: session.subscription
    });
  } catch (error: any) {
    console.error('Error verificando sesión de Stripe:', error);
    return NextResponse.json(
      { error: error?.message || 'Error verificando pago' },
      { status: 500 }
    );
  }
}
