import React from "react";
import { Box, Divider } from "@mui/material";
import CreateTeamForm, {
  EditOrCreateTeamFormValues,
} from "components/organisms/CreateTeamForm/CreateTeamForm";
import ClearIcon from "@mui/icons-material/Clear";
import { FormErrors } from "../../organisms/CreateTeamForm/utils";

export type CreateTeamSectionProps = {
  index: number;
  team: EditOrCreateTeamFormValues;
  setTeam: (index: number, values: EditOrCreateTeamFormValues) => void;
  errors: FormErrors<EditOrCreateTeamFormValues>;
  setErrors: (
    index: number,
    errors: FormErrors<EditOrCreateTeamFormValues>
  ) => void;
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
        setValues={(values: EditOrCreateTeamFormValues) =>
          setTeam(index, values)
        }
        errors={errors}
        setErrors={(errors: FormErrors<EditOrCreateTeamFormValues>) =>
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
