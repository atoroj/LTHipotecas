// src/actions/index.ts
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

export const server = {
  send: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(2, "El nombre es muy corto"),
      phone: z.string().min(6, "El teléfono no parece válido"),
      email: z.string().email("El email no es válido"),
      message: z.string().min(5, "El mensaje es muy corto"),
    }),
    handler: async (input) => {
      // Inicializamos Resend dentro del handler para evitar errores de carga
      const resend = new Resend(import.meta.env.RESEND_API_KEY);
      const { name, phone, email, message } = input;

      const { error } = await resend.emails.send({
        // Dominio verificado
        from: 'LT Hipotecas <no-reply@lthipotecas.com>',
        // Donde recibe el aviso
        to: ['info@lthipotecas.com'], 
        
        // RESPONDER A: El email del cliente (para que al dar a "responder" le escribas a él)
        replyTo: email,
        
        subject: `🏡 Nuevo mensaje de: ${name}`,
        
        html: `
          <!DOCTYPE html>
          <html lang="es">
            <head>
              <meta charset="UTF-8">
            </head>
            <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
              
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                
                <div style="background-color: #2563EB; padding: 30px 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Nuevo Solicitud de información Web</h1>
                </div>

                <div style="padding: 30px;">
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold; width: 100px;">Nombre:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 16px;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold;">Email:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 16px;">
                          <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: bold;">Teléfono:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-size: 16px;">
                          <a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div style="margin-bottom: 20px;">
                    <p style="color: #64748b; font-size: 14px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase;">Mensaje del cliente:</p>
                    <div style="background-color: #fff; border-left: 4px solid #2563EB; padding: 15px; color: #334155; line-height: 1.6; font-style: italic;">
                      "${message}"
                    </div>
                  </div>

                </div>

                <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #94a3b8; font-size: 12px;">Este correo se envió automáticamente desde lthipotecas.com</p>
                </div>

              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error("Error enviando email:", error);
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No se pudo enviar el correo, inténtalo más tarde."
        });
      }

      return { success: true };
    },
  }),
};