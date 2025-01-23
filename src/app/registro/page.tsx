"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/generales/LoadingScreen";
import DatosPersonales from "@/components/usuarios/DatosPersonales";
import DatosFacturacion from "@/components/usuarios/DatosFacturacion";

const page = () => {
  const methods = useForm({
    defaultValues: {
      nombre: "",
      apellidos: "",
      tipo_documento: "",
      numero_documento: "",
      correo: "",
      codigo_pais: "+52",
      telefono: "",
      files: null,
      usarDatosFacturacion: true,

      nombre_facturacion: "",
      apellidos_facturacion: "",
      tipo_documento_facturacion: "",
      numero_documento_facturacion: "",
      correo_facturacion: "",
      codigo_pais_facturacion: "+52",
      telefono_facturacion: "",
    },
  });

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     nombre: "",
  //     apellidos: "",
  //     tipo_documento: "",
  //     numero_documento: "",
  //     correo: "",
  //     codigo_pais: "+52",
  //     telefono: "",
  //     file: null,
  //     usarDatosFacturacion: true,

  //     nombre_facturacion: "",
  //     apellidos_facturacion: "",
  //     tipo_documento_facturacion: "",
  //     numero_documento_facturacion: "",
  //     correo_facturacion: "",
  //     codigo_pais_facturacion: "+52",
  //     telefono_facturacion: "",
  //   },
  // });

  const router = useRouter();

  // Estatus para guardar el file
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [filesUpload, setFilesUpload] = useState<{ file: File }[]>([]);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false); // Nuevo estado para mostrar el ícono de éxito
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterNewUser = (data: any) => {

    if(filesUpload.length === 0){
      methods.setError("files",{
        type:"manual",
        message:"Debes subir al menos un archivo"
      });
      return;
    }

    setIsLoading(true);

    if (data.usarDatosFacturacion) {
      data.nombre_facturacion = data.nombre;
      data.apellidos_facturacion = data.apellidos;
      data.tipo_documento_facturacion = data.tipo_documento;
      data.numero_documento_facturacion = data.numero_documento;
      data.correo_facturacion = data.correo;
      data.codigo_pais_facturacion = data.codigo_pais;
      data.telefono_facturacion = data.telefono;
    }

    const formData = new FormData();

    // Agregar los datos del formulario a FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    //Agregar los archivos
    filesUpload.forEach(({ file }) => {
      formData.append("files", file); // Usa el mismo nombre que esperas en tu backend
    });

    //Ejecutart la peticion 3 segundos despues tal como se pide en los requisitos del programa
    setTimeout(async () => {
      try {
        const response = await fetch("/api/usuarios", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          toast.success("Perfil creado exitosamente!");
          router.push(`/usuario/${result.data.id}`);
        } else {
          const errorMessages = result.error;
          if (errorMessages && Array.isArray(errorMessages)) {
            const formattedErrors = errorMessages
              .map((error: string) => `* ${error}`)
              .join("\n");
            toast.error(formattedErrors); 
          }
        }
      } catch (error) {
        toast.error("Hubo un problema con la solicitud de registro,comunicate con IT...");
        console.error("Hubo un problema con la solicitud de registro", error);
      }
      setIsLoading(false);
    }, 3000);
  };

  const handleFileUpload = (e: any) => {
    methods.clearErrors("files"); // -> Borrar cualquier error si el usuario ya subio una imagen

    if (filesUpload.length >= 4) {
      return toast.error("Solo puedes cargar hasta 4 archivos");
    }
    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      status: "uploading",
    }));
    setIsUploadingFile(true); // Activar el estado de carga
    setFilesUpload((prevFiles: any) => [...prevFiles, ...newFiles]);

    newFiles.forEach((fileObj, index) => {
      setTimeout(() => {
        setIsUploadingFile(false); // Termina la carga
        setFilesUpload((prevFiles) =>
          prevFiles.map((item, i) =>
            i === index ? { ...item, status: "uploaded" } : item
          )
        );
        setShowSuccessIcon(true);
        setTimeout(() => {
          setShowSuccessIcon(false);
        }, 1000);
      }, 1000);
    });
  };

  const handleDeleteFile = (index: number) => {
    // Eliminar el archivo del estado
    setFilesUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <section className="flex flex-col items-center min-h-screen p-10 w-screen bg-[#121317] overflow-y-auto overflow-x-hidden relative">
      {isLoading && <LoadingScreen message="Estamos validando tus datos..." />}
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-16 h-16 mb-5"
        style={{ objectFit: "contain" }}
      />
      <form
        className="w-full flex flex-col items-center gap-5"
        onSubmit={methods.handleSubmit(handleRegisterNewUser)}
      >
        <div className="lg:w-2/5 w-full">
          <DatosPersonales
            methods={methods}
            showFileUpload={true}
            isUploadingFile={isUploadingFile}
            filesUpload={filesUpload}
            handleFileUpload={handleFileUpload}
            handleDeleteFile={handleDeleteFile}
            showSuccessIcon={showSuccessIcon}
          />
        </div>
        <div className="lg:w-2/5 w-full">
          <DatosFacturacion methods={methods} />
        </div>
        <Button
          type="submit"
          color="warning"
          className="w-full lg:w-2/5 bg-[#FCB115] text-black font-semibold"
        >
          Enviar
        </Button>
      </form>
    </section>
  );
};

export default page;
