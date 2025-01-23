import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import CountryCodeSelectV1 from "../ui/CountryCodeSelector/CountryCodeSelectV1";

const DatosFacturacion = ({ methods, showCheckBox = true }: any) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
  } = methods;

  return (
    <div className="bg-[#181A1F] p-5 rounded-lg flex flex-col gap-5 w-full">
      <h2 className="text-gray-500 text-base">Datos de facturación</h2>
      {showCheckBox && (
        <Checkbox
          size="sm"
          color="warning"
          {...register("usarDatosFacturacion")}
        >
          Usar los mismos datos para la facturación
        </Checkbox>
      )}
      {(!watch("usarDatosFacturacion") || !showCheckBox) && (
        <>
          <Input
            size="sm"
            label="Nombre(s)"
            isInvalid={!!errors.nombre_facturacion}
            errorMessage={errors.nombre_facturacion?.message}
            {...register("nombre_facturacion", {
              required: "El nombre es obligatorio",
            })}
            placeholder="Nombre de facturación"
          />

          <Input
            size="sm"
            label="Apellido"
            isInvalid={!!errors.apellidos_facturacion}
            errorMessage={errors.apellidos_facturacion?.message}
            {...register("apellidos_facturacion", {
              required: "El apellido es obligatorio",
            })}
            placeholder="Apellido de facturación"
          />

          <Select
            size="sm"
            label="Tipo de documento"
            placeholder="Seleccione un tipo"
            {...register("tipo_documento_facturacion", {
              required: "Este campo es obligatorio",
            })}
          >
            <SelectItem key={"DNI"} value={"DNI"}>
              DNI
            </SelectItem>
            <SelectItem key={"Pasaporte"} value={"Pasaporte"}>
              Pasaporte
            </SelectItem>
          </Select>

          <Input
            size="sm"
            label="Número de documento"
            isInvalid={!!errors.numero_documento_facturacion}
            errorMessage={errors.numero_documento_facturacion?.message}
            {...register("numero_documento_facturacion", {
              required: "El número de documento es obligatorio",
            })}
            placeholder="Número de documento de facturación"
          />

          <Input
            size="sm"
            label="Correo electrónico"
            isInvalid={!!errors.correo_facturacion}
            errorMessage={errors.correo_facturacion?.message}
            {...register("correo_facturacion", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Ingrese un correo válido",
              },
            })}
            placeholder="Correo electrónico de facturación"
          />

          <div className="flex justify-start items-center gap-5">
            <CountryCodeSelectV1
              defaultValue="+52"
              control={control}
              name="codigo_pais_facturacion"
              label="Código de país"
              size="sm"
            />
            <Input
              size="sm"
              label="Número de teléfono"
              isInvalid={!!errors.telefono_facturacion}
              errorMessage={errors.telefono_facturacion?.message}
              {...register("telefono_facturacion", {
                required: "El número de teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Solo se permiten números",
                },
              })}
              placeholder="Número de teléfono de facturación"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DatosFacturacion;
