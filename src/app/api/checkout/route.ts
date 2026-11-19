import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planType, userEmail, userName, userId, origin } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY no configurada en el servidor' },
        { status: 500 }
      );
    }

    const isDocente = planType === 'docente_5usd';
    const amountInCents = isDocente ? 665 : 1320; // $6.65 USD vs $13.20 USD
    const planTitle = isDocente 
      ? 'DOCENTIA · Plan Docente Certificado Oficial' 
      : 'DOCENTIA · Plan Escuela & Institución Verificada';
    const planDesc = isDocente
      ? 'Acreditación oficial con Cédula, postulación ilimitada a colegios y bolsa de interinatos Docente SOS.'
      : 'Publicación ilimitada de vacantes docentes, acceso a expedientes con Cédula verificada y panel ATS escolar.';

    const siteOrigin = origin || req.nextUrl.origin || 'https://docentia-two.vercel.app';

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: userEmail || undefined,
      client_reference_id: userId || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amountInCents,
            recurring: {
              interval: 'month'
            },
            product_data: {
              name: planTitle,
              description: planDesc,
              images: [
                `${siteOrigin}/images/docentia-avatar.png`
              ]
            }
          },
          quantity: 1
        }
      ],
      success_url: `${siteOrigin}/?payment=success&session_id={CHECKOUT_SESSION_ID}&plan=${planType}`,
      cancel_url: `${siteOrigin}/?payment=cancelled`,
      metadata: {
        userId: userId || 'anon',
        userEmail: userEmail || 'unknown',
        userName: userName || '',
        planType: planType || 'docente_5usd'
      }
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error('Error al crear Checkout Session de Stripe:', error);
    return NextResponse.json(
      { error: error?.message || 'Error interno en la pasarela de pagos' },
      { status: 500 }
    );
  }
}
