import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const ControlledTextField = ({
  name,
  label,
  control,
  select,
  renderValue,
  children,
  sx,
  type,
  InputProps,
  defaultValue,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <TextField
            type={type}
            sx={sx}
            fullWidth
            select={select}
            label={label}
            value={value}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            SelectProps={{
              value,
              onChange,
              renderValue,
            }}
            InputProps={InputProps}
          >
            {children}
          </TextField>
        );
      }}
    />
  );
};
