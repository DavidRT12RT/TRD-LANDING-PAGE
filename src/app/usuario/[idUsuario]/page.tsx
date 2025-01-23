"use client";
import LoadingScreen from "@/components/generales/LoadingScreen";
import DatosFacturacion from "@/components/usuarios/DatosFacturacion";
import DatosPersonales from "@/components/usuarios/DatosPersonales";
import Imagenes from "@/components/usuarios/Imagenes";
import { getWeatherData } from "@/lib/getWeatherData";
import { CloudSun } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Weather = {
  temperature: number;
};

const Page = () => {
  const { idUsuario } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [locationError, setLocationError] = useState<string>("");

  const methods = useForm({
    defaultValues: {
      nombre: "",
      apellidos: "",
      tipo_documento: "",
      numero_documento: "",
      correo: "",
      codigo_pais: "+52",
      telefono: "",
      files: [],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/usuarios?id=${idUsuario}`, {
          method: "GET",
        });
        const result = await response.json();

        if (result.data) {
          const defaultValues = {
            nombre: result.data.nombre || "",
            apellidos: result.data.apellidos || "",
            tipo_documento: result.data.tipo_documento || "",
            numero_documento: result.data.numero_documento || "",
            correo: result.data.correo || "",
            codigo_pais: result.data.codigo_pais || "+52",
            telefono: result.data.telefono || "",
            usarDatosFacturacion: result.data.usarDatosFacturacion || true,
            files: result.data.files || [],
            nombre_facturacion: result.data.nombre_facturacion || "",
            apellidos_facturacion: result.data.apellidos_facturacion || "",
            tipo_documento_facturacion:
              result.data.tipo_documento_facturacion || "",
            numero_documento_facturacion:
              result.data.numero_documento_facturacion || "",
            correo_facturacion: result.data.correo_facturacion || "",
            codigo_pais_facturacion:
              result.data.codigo_pais_facturacion || "+52",
            telefono_facturacion: result.data.telefono_facturacion || "",
          };

          Object.keys(defaultValues).forEach((key) => {
            //@ts-ignore
            methods.setValue(key, defaultValues[key]);
          });
        } else {
          toast.error("Error cargando datos del usuario.");
        }
      } catch (error) {
        router.push("/");
        toast.error("Error obteniendo la información del usuario.");
      } finally {
        setIsLoading(false);
      }
    };

    if (idUsuario) fetchData();
  }, [idUsuario, methods]);

  // Función para obtener la ubicación y llamar a la API de Open Meteo
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherData = await getWeatherData(latitude, longitude); 
            setWeather(weatherData); 
          } catch (error:any) {
            setLocationError(error.message);
            console.error(error);
          }
        },
        (error) => {
          setLocationError("No se pudo obtener la ubicación.");
          console.error(error);
        }
      );
    } else {
      setLocationError(
        "La geolocalización no está disponible en este navegador."
      );
    }
  }, []);

  return (
    <section
      className="flex flex-col items-center min-h-screen w-screen 
      p-10 bg-[#121317] overflow-y-auto overflow-x-hidden relative"
    >
      {isLoading && (
        <LoadingScreen message="Cargando información del usuario..." />
      )}
      {!isLoading && (
        <>
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="w-16 h-16 mb-5"
            style={{ objectFit: "contain" }}
          />
          <div className="w-full flex justify-between items-center max-w-5xl mb-5">
            <h2 className="text-lg whitespace-nowrap">
              Hola, {methods.watch("nombre")} {methods.watch("apellidos")}
            </h2>
            <div className="w-full flex items-center gap-2 justify-end">
              {locationError ? (
                <p className="text-red-500 font-light text-lg">
                  {locationError}
                </p>
              ) : (
                <p className="font-light text-white text-lg">
                  {weather ? `${weather.temperature}°C` : "Cargando..."}
                </p>
              )}
              <CloudSun size={32} />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10 w-full max-w-5xl justify-center items-center lg:items-stretch h-full">
            {/* Columna izquierda */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
              <Imagenes files={methods.watch("files")} />
            </div>
            {/* Columna derecha */}
            <div className="w-full lg:w-1/2 flex flex-col gap-5 items-center lg:items-start justify-between h-full">
              <div className="flex flex-col gap-5 w-full">
                <DatosPersonales methods={methods} showFileUpload={false} />
                <DatosFacturacion methods={methods} showCheckBox={false} />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Page;
