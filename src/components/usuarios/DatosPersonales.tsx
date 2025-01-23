import { Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { CircleCheck, Download, Trash2 } from "lucide-react";
import CountryCodeSelectV1 from "../ui/CountryCodeSelector/CountryCodeSelectV1";

const DatosPersonales = ({
  methods,
  showFileUpload = true,
  isUploadingFile,
  filesUpload,
  handleFileUpload,
  handleDeleteFile,
  showSuccessIcon,
}: any) => {
  const { register, formState, control, watch } = methods;

  // Observamos los valores con watch
  const valoresForm = watch();

  return (
    <div className="bg-[#181A1F] p-5 rounded-lg flex flex-col gap-5 w-full">
      <h2 className="text-gray-500 text-base">Información personal</h2>

      {/* Nombre */}
      <Input
        size="sm"
        label="Nombre(s)"
        isInvalid={!!formState.errors.nombre}
        errorMessage={formState.errors.nombre?.message}
        {...register("nombre", { required: "El nombre es obligatorio" })}
        value={valoresForm.nombre || ""} // Usamos el valor de `watch()`
        placeholder="Nombre"
      />

      {/* Apellidos */}
      <Input
        size="sm"
        label="Apellidos"
        isInvalid={!!formState.errors.apellidos}
        errorMessage={formState.errors.apellidos?.message}
        {...register("apellidos", { required: "El apellido es obligatorio" })}
        value={valoresForm.apellidos || ""} // Usamos el valor de `watch()`
        placeholder="Apellido"
      />

      {/* Tipo de documento */}
      <Select
        size="sm"
        label="Tipo de documento"
        placeholder="Seleccione un tipo"
        isInvalid={!!formState.errors.tipo_documento}
        errorMessage={formState.errors.tipo_documento?.message}
        {...register("tipo_documento", {
          required: "Este campo es obligatorio",
        })}
        value={valoresForm.tipo_documento || ""} // Usamos el valor de `watch()`
      >
        <SelectItem key="DNI" value="DNI">
          DNI
        </SelectItem>
        <SelectItem key="Pasaporte" value="Pasaporte">
          Pasaporte
        </SelectItem>
      </Select>

      {/* Número de documento */}
      <Input
        size="sm"
        label="Número de documento"
        isInvalid={!!formState.errors.numero_documento}
        errorMessage={formState.errors.numero_documento?.message}
        {...register("numero_documento", {
          required: "El número de documento es obligatorio",
        })}
        value={valoresForm.numero_documento || ""} // Usamos el valor de `watch()`
        placeholder="Número de documento"
      />

      {/* Correo electrónico */}
      <Input
        size="sm"
        label="Correo electrónico"
        isInvalid={!!formState.errors.correo}
        errorMessage={formState.errors.correo?.message}
        {...register("correo", {
          required: "El correo es obligatorio",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: "Ingrese un correo válido",
          },
        })}
        value={valoresForm.correo || ""} // Usamos el valor de `watch()`
        placeholder="Correo electrónico"
      />

      {/* Teléfono */}
      <div className="flex justify-start items-center gap-5">
        <CountryCodeSelectV1
          defaultValue={valoresForm.codigo_pais || "+52"} // Valor por defecto
          control={control}
          label="Código de país"
          name="codigo_pais"
          size="sm"
        />
        <Input
          size="sm"
          label="Número de teléfono"
          isInvalid={!!formState.errors.telefono}
          errorMessage={formState.errors.telefono?.message}
          {...register("telefono", {
            required: "El número de teléfono es obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message: "Solo se permiten números",
            },
          })}
          maxLength={10}
          value={valoresForm.telefono || ""} // Usamos el valor de `watch()`
          placeholder="Número de teléfono"
        />
      </div>
      {/* Subida de Archivos */}
      {showFileUpload && (
        <>
          <h3 className="text-gray-500 text-base">
            Carga hasta 4 imágenes para tu perfil
          </h3>
          {isUploadingFile ? (
            <motion.div
              initial={{ opacity: 0, backgroundPosition: "-100% 0" }}
              animate={{ opacity: 1, backgroundPosition: "100% 0" }}
              exit={{ opacity: 0 }}
              className="w-full p-3 rounded-lg"
              style={{
                background:
                  "linear-gradient(to right, #FFEB3B, #D500F9, #2196F3)",
                backgroundSize: "200% 100%",
                transition: "background-position 1s ease-in-out",
              }}
            >
              <p className="text-white">Cargando archivo...</p>
            </motion.div>
          ) : showSuccessIcon ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full p-3 rounded-lg flex justify-center items-center"
              style={{
                background:
                  "linear-gradient(to right, #FFEB3B, #D500F9, #2196F3)",
              }}
            >
              <CircleCheck size={25} color="white" />
            </motion.div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex gap-3 justify-start items-center bg-[#3d3d44] rounded-lg p-3 cursor-pointer"
            >
              <Download size={20} />
              <div className="flex flex-col">
                <p className="text-sm">
                  Haz clic o arrastra los archivos en esta área para cargarlo
                </p>
                <p className="text-gray-500 text-xs">
                  JPG, PNG, Tiff, hasta 2 MB
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
          {!isUploadingFile && !showSuccessIcon && filesUpload.length > 0 && (
            <>
              <h3 className="text-gray-500 text-base">Imágenes cargadas</h3>
              <div
                className="w-full p-3 flex flex-col gap-3"
                style={{
                  border: "1px solid", 
                  borderImage:
                    "linear-gradient(to right, #FFEB3B, #D500F9, #2196F3) 1", // El gradiente para el borde
                  borderRadius: "8px", // Bordes redondeados
                }}
              >
                {filesUpload.map((fileObj: any, index: any) => (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <p className="text-sm text-white">{fileObj.file.name}</p>
                    </div>
                    <Trash2
                      size={18}
                      color="white"
                      onClick={() => handleDeleteFile(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {formState.errors.files && (
            <p className="text-red-500">{formState.errors.files.message}</p>
          )}
        </>
      )}
    </div>
  );
};

export default DatosPersonales;
