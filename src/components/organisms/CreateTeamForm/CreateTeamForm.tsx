import React, { PropsWithChildren, useCallback, useMemo } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Divider,
  InputAdornment,
  Popper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "components/molecules/TextField/TextField";
import { useIntl } from "react-intl";
import { useGetRepositoriesQuery } from "redux/api/repositories/repositories.api";
import { Repository } from "redux/api/repositories/repositories.types";
import GitHubIcon from "./GitHubIcon";
import { FormErrors } from "./utils";
import { PropsWithSx } from "types/PropsWithSx";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const intermediateIcon = <IndeterminateCheckBoxIcon fontSize="small" />;

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

  const allSelected = useMemo(
    () => values.repositoryIds.length === repositories.length,
    [repositories.length, values.repositoryIds.length]
  );

  const selectionEmpty = useMemo(
    () => values.repositoryIds.length === 0,
    [values.repositoryIds.length]
  );

  const selectAll = useCallback(() => {
    setValues({
      ...values,
      repositoryIds: repositories.map((repo) => repo.id),
    });
  }, [repositories, setValues, values]);

  const deselectAll = useCallback(() => {
    setValues({
      ...values,
      repositoryIds: [],
    });
  }, [setValues, values]);

  const handleSelectAllChange = useCallback(() => {
    if (allSelected || !selectionEmpty) {
      return deselectAll();
    }

    return selectAll();
  }, [allSelected, deselectAll, selectAll, selectionEmpty]);

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
        disableCloseOnSelect
        options={repositories}
        getOptionLabel={(option) => option.name}
        noOptionsText={formatMessage({
          id: "on-boarding.create-teams.form.repositories-field-no-option",
        })}
        loading={isLoading}
        loadingText={formatMessage({
          id: "on-boarding.create-teams.form.repositories-field-loading",
        })}
        PopperComponent={(param) => (
          <Popper {...param}>
            <Box
              sx={{
                overflow: "hidden",
                background: "white",
                borderRadius: "4px",
                boxShadow:
                  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
              }}
            >
              <Box
                sx={{
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "rgba(0,0,0,0.87)",
                  fontWeight: 100,
                  textTransform: "uppercase",
                }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleSelectAllChange}
              >
                <Checkbox
                  checked={!selectionEmpty}
                  onChange={handleSelectAllChange}
                  checkedIcon={allSelected ? checkedIcon : intermediateIcon}
                  icon={icon}
                  id="check-all"
                  sx={{ marginRight: "8px" }}
                  onMouseDown={(e) => e.preventDefault()}
                />
                {formatMessage({
                  id: selectionEmpty
                    ? "on-boarding.create-teams.form.select-all-label"
                    : "on-boarding.create-teams.form.deselect-all-label",
                })}
              </Box>
              <Divider />
              <Box
                sx={{
                  "& .MuiPaper-root": {
                    boxShadow: "none",
                    borderRadius: 0,
                  },
                }}
              >
                {param.children as React.ReactNode}
              </Box>
            </Box>
          </Popper>
        )}
        renderTags={(value: readonly Repository[], getTagProps) =>
          value.map((option: Repository, index: number) => (
            <Chip
              icon={<GitHubIcon />}
              label={option.name}
              {...getTagProps({ index })}
            />
          ))
        }
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
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
