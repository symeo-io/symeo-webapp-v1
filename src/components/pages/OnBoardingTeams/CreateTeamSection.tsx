import React from "react";
import { Box, Divider } from "@mui/material";
import CreateTeamForm, {
  CreateTeamFormValues,
} from "components/organisms/CreateTeamForm/CreateTeamForm";
import ClearIcon from "@mui/icons-material/Clear";
import { FormErrors } from "../../organisms/CreateTeamForm/utils";

export type CreateTeamSectionProps = {
  index: number;
  team: CreateTeamFormValues;
  setTeam: (index: number, values: CreateTeamFormValues) => void;
  errors: FormErrors<CreateTeamFormValues>;
  setErrors: (index: number, errors: FormErrors<CreateTeamFormValues>) => void;
  teamsNumber: number;
  onRemoveTeamClick: (index: number) => void;
};

function CreateTeamSection({
  index,
  team,
  setTeam,
  errors,
  setErrors,
  teamsNumber,
  onRemoveTeamClick,
}: CreateTeamSectionProps) {
  return (
    <>
      {index !== 0 && (
        <Divider sx={{ marginTop: (theme) => theme.spacing(4) }} />
      )}
      <Box
        sx={{
          padding: (theme) => theme.spacing(1),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ClearIcon
          onClick={() => onRemoveTeamClick(index)}
          sx={{
            cursor: "pointer",
            fontSize: "18px",
            visibility: teamsNumber <= 1 ? "hidden" : undefined,
          }}
        />
      </Box>
      <CreateTeamForm
        key={index}
        values={team}
        setValues={(values: CreateTeamFormValues) => setTeam(index, values)}
        errors={errors}
        setErrors={(errors: FormErrors<CreateTeamFormValues>) =>
          setErrors(index, errors)
        }
        sx={{
          marginTop: index !== 0 ? (theme) => theme.spacing(3) : undefined,
        }}
      />
    </>
  );
}

export default CreateTeamSection;
