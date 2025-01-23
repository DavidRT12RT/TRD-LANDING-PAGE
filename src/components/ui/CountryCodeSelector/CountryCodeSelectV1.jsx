import React, { useMemo } from "react";
import { Avatar, Select, SelectItem } from "@nextui-org/react";
import { useController } from "react-hook-form";
import { countrys } from "./countryCodes";
import { codesAPI } from "./countryCodesAPI";

export default function CountryCodeSelectV1({
  control,
  name,
  rules = {},
  classNames = {},
  defaultValue = "",
  placeholder = " ",
  onSelectionChange = (v) => v,
  
  onClear = () => {},
  label,
  theme = "dark", // Agregado para determinar el tema
  ...props
}) {

  const {
    field: { ref, value, onChange: onChange_, onBlur },
    fieldState: { invalid, isTouched, isDirty, error },
  } = useController({ name, control, rules, defaultValue: defaultValue });

  const isMultiple = useMemo(() => {
    return props?.selectionMode === "multiple";
  }, [props?.selectionMode]);

  const invertedCodesAPI = useMemo(() => {
    const invertedCodes = {};
    for (const [key, value] of Object.entries(codesAPI)) {
      invertedCodes[value] = key;
    }
    return invertedCodes;
  }, []);

  const options = useMemo(() => {
    return countrys.map(country => {
      const code = invertedCodesAPI[country.name];
      return {
        value: country.dial_code,
        label: `${country.dial_code} ${country.name}`,
        name: country.name,
        code
      };
    })
  }, []);

  const selectedKeys = useMemo(() => {
    if (options.length) {
      if (value) {
        let data = [];
        if (isMultiple && typeof value === 'string') {
          data = value.split(',').map(v => v.trim());
        } else {
          data = isMultiple ? value : [value];
        }
        data = data.filter(ff => options.find(f => (f?.value ?? f) === ff))
                   .map(m => {
                     const item = options.find(f => (f?.value ?? f) === m);
                     return item?.value ?? item;
                   });
        return new Set(data);
      }
    }
    return [];
  }, [isMultiple, options, value]);

  const componentProps = {
    label: rules?.required ? `${label} *` : label,
    name,
    value: value ? value : undefined,
    placeholder,
    isInvalid: invalid,
    errorMessage: invalid ? error?.message : "",
    // classNames: {
    //   ...classNames,
    //   label: [
    //     "font-bold",
    //     theme === "light" ? "text-gray-800 after:text-gray-800" : "text-white after:text-white",
    //     invalid ? "pb-[0px]" : '',
    //     classNames?.label
    //   ],
    //   // base: [`md:min-w-[50px]`],
    //   trigger: [`rounded-xl`, classNames?.trigger],
    // },
    onSelectionChange: (_v) => {
      const v = isMultiple ? [..._v] : [..._v][0];
      onChange_(v);
      onSelectionChange(v);
    },
    selectedKeys,
    children: options.map((item) => {
      return (
        <SelectItem 
          startContent={
            <Avatar 
              alt={item.value} 
              className="w-6 h-6" 
              src={`https://flagcdn.com/${item?.code}.svg`} 
            />
          }
          key={item.value} 
          value={item.value} 
        >
          {item.label}
        </SelectItem>
      )
    }),
    ...props,
  };
  
  return <Select {...componentProps} />;
}
