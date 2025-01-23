import { uploadFileToS3 } from "../../../lib/uploadFileToS3";
import { supabase } from "../../../lib/supabase";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const nombre = formData.get("nombre") as string;
    const apellidos = formData.get("apellidos") as string;
    const tipo_documento = formData.get("tipo_documento") as string;
    const numero_documento = formData.get("numero_documento") as string;
    const correo = formData.get("correo") as string;
    const telefono = formData.get("telefono") as string;

    const nombre_facturacion = formData.get("nombre_facturacion") as string;
    const apellidos_facturacion = formData.get(
      "apellidos_facturacion"
    ) as string;
    const tipo_documento_facturacion = formData.get(
      "tipo_documento_facturacion"
    ) as string;
    const numero_documento_facturacion = formData.get(
      "numero_documento_facturacion"
    ) as string;
    const correo_facturacion = formData.get("correo_facturacion") as string;
    const codigo_pais_facturacion = formData.get(
      "codigo_pais_facturacion"
    ) as string;
    const telefono_facturacion = formData.get("telefono_facturacion") as string;

    const files = formData.getAll("files") as File[]; // Obtén los archivos

    // Validación de los campos obligatorios
    if (
      !nombre ||
      !apellidos ||
      !tipo_documento ||
      !numero_documento ||
      !correo ||
      !telefono ||
      !nombre_facturacion ||
      !apellidos_facturacion ||
      !tipo_documento_facturacion ||
      !numero_documento_facturacion ||
      !correo_facturacion ||
      !telefono_facturacion
    ) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son requeridos" }),
        {
          status: 400,
        }
      );
    }

    // Verificar si el correo ya está registrado
    const { data: existingUserByEmail, error: userErrorByEmail } =
      await supabase.from("users").select("correo").eq("correo", correo);

    // Verificar si el teléfono ya está registrado
    const { data: existingUserByPhone, error: userErrorByPhone } =
      await supabase.from("users").select("telefono").eq("telefono", telefono);

    const errorMessages = [];

    if (existingUserByEmail && existingUserByEmail.length > 0) {
      errorMessages.push("El correo electrónico ya está registrado.");
    }

    if (existingUserByPhone && existingUserByPhone.length > 0) {
      errorMessages.push("El número de teléfono ya está registrado.");
    }

    if (errorMessages.length > 0) {
      return new Response(JSON.stringify({ error: errorMessages }), {
        status: 400,
      });
    }

    // Subir archivos a S3 y obtener las URLs
    const fileUrls: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        const fileUrl = await uploadFileToS3(file);
        fileUrls.push(fileUrl);
      }
    }

    // Insertar datos del usuario en Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          nombre,
          apellidos,
          tipo_documento,
          numero_documento,
          correo,
          telefono,
          nombre_facturacion,
          apellidos_facturacion,
          tipo_documento_facturacion,
          numero_documento_facturacion,
          correo_facturacion,
          codigo_pais_facturacion,
          telefono_facturacion,
          files: fileUrls,
        },
      ])
      .select();

    if (error) {
      console.error("Error al insertar en la base de datos:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ data: data[0] }), { status: 201 });
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
      }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "El ID del usuario es requerido" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error al obtener el usuario:", error);
      return new Response(
        JSON.stringify({ error: "No se pudo obtener el usuario" }),
        { status: 500 }
      );
    }

    if (!data) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
      }
    );
  }
};
