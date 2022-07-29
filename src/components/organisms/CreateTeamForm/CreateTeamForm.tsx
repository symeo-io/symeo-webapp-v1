import React, { PropsWithChildren, useCallback, useMemo } from "react";
import { Autocomplete, Box, Chip, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "components/molecules/TextField/TextField";
import { useIntl } from "react-intl";
import { useGetRepositoriesQuery } from "redux/api/repositories/repositories.api";
import { Repository } from "redux/api/repositories/repositories.types";
import GitHubIcon from "./GitHubIcon";
import { FormErrors } from "./utils";
import { PropsWithSx } from "types/PropsWithSx";

export type EditOrCreateTeamFormValues = {
  name: string;
  repositoryIds: number[];
};

export type OnBoardingCardProps = PropsWithChildren &
  PropsWithSx & {
    values: EditOrCreateTeamFormValues;
    setValues: (values: EditOrCreateTeamFormValues) => void;
    errors: FormErrors<EditOrCreateTeamFormValues>;
    setErrors: (errors: FormErrors<EditOrCreateTeamFormValues>) => void;
  };

function CreateTeamForm({
  values,
  setValues,
  errors,
  setErrors,
  sx,
}: OnBoardingCardProps) {
  const { formatMessage } = useIntl();
  const { data, isLoading } = useGetRepositoriesQuery();

  const repositories = useMemo(
    () => (data && data.repositories ? data.repositories : []),
    [data]
  );

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, name: event.target.value });
      setErrors({ ...errors, name: [] }); // Resetting errors when editing field
    },
    [errors, setErrors, setValues, values]
  );

  const handleRepositoriesChange = useCallback(
    (event: any, repositories: Repository[]) => {
      setValues({
        ...values,
        repositoryIds: repositories.map((repo) => repo.id),
      });
      setErrors({ ...errors, repositoryIds: [] }); // Resetting errors when editing field
    },
    [errors, setErrors, setValues, values]
  );

  const selectedRepositories = useMemo(
    () => repositories.filter((repo) => values.repositoryIds.includes(repo.id)),
    [repositories, values.repositoryIds]
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
        error={errors.name.length > 0}
        helperText={
          errors.name.length > 0
            ? errors.name
                .map((error) => formatMessage({ id: error }))
                .join(", ")
            : undefined
        }
      />
      <Autocomplete
        value={selectedRepositories}
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
            error={errors.repositoryIds.length > 0}
            helperText={
              errors.repositoryIds.length > 0
                ? errors.repositoryIds
                    .map((error) => formatMessage({ id: error }))
                    .join(", ")
                : undefined
            }
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
