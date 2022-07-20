import React, { PropsWithChildren, useCallback, useMemo } from "react";
import {
  Autocomplete,
  Box,
  BoxProps,
  Chip,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "components/molecules/TextField/TextField";
import { useIntl } from "react-intl";
import { useGetRepositoriesQuery } from "redux/api/repository/repository.api";
import { Repository } from "redux/api/repository/repository.type";
import GitHubIcon from "./GitHubIcon";

export type CreateTeamFormValues = {
  name: string;
  repositories: Repository[];
};

export type OnBoardingCardProps = PropsWithChildren & {
  values: CreateTeamFormValues;
  setValues: (values: CreateTeamFormValues) => void;
  sx?: BoxProps["sx"];
};

function CreateTeamForm({ values, setValues, sx }: OnBoardingCardProps) {
  const { formatMessage } = useIntl();
  const { data, isLoading } = useGetRepositoriesQuery();

  const repositories = useMemo(
    () => (data && data.repositories ? data.repositories : []),
    [data]
  );

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, name: event.target.value });
    },
    [setValues, values]
  );

  const handleRepositoriesChange = useCallback(
    (event: any, repositories: Repository[]) => {
      setValues({ ...values, repositories });
    },
    [setValues, values]
  );

  return (
    <Box sx={{ ...sx }}>
      <TextField
        name="name"
        value={values.name}
        onChange={handleNameChange}
        fullWidth
        required
        label={formatMessage({
          id: "on-boarding.create-teams.form.name-field-label",
        })}
        placeholder={formatMessage({
          id: "on-boarding.create-teams.form.name-field-placeholder",
        })}
        sx={{ marginBottom: (theme) => theme.spacing(2) }}
      />
      <Autocomplete
        value={values.repositories}
        onChange={handleRepositoriesChange}
        multiple
        options={repositories}
        getOptionLabel={(option) => option.name}
        noOptionsText={formatMessage({
          id: "on-boarding.create-teams.form.repositories-field-no-option",
        })}
        loading={isLoading}
        loadingText={formatMessage({
          id: "on-boarding.create-teams.form.repositories-field-loading",
        })}
        renderTags={(value: readonly Repository[], getTagProps) =>
          value.map((option: Repository, index: number) => (
            <Chip
              icon={<GitHubIcon />}
              label={option.name}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name="repositories"
            required
            label={formatMessage({
              id: "on-boarding.create-teams.form.repositories-field-label",
            })}
            placeholder={formatMessage({
              id: "on-boarding.create-teams.form.repositories-field-placeholder",
            })}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{
          "& .MuiAutocomplete-endAdornment": {
            display: "none",
          },
          "& .MuiInput-root.MuiInputBase-root.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot":
            {
              paddingRight: "12px",
            },
        }}
      />
    </Box>
  );
}

export default CreateTeamForm;
