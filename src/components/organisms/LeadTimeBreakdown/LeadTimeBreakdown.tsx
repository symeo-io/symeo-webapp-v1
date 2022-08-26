import { Box, Card } from "@mui/material";
import { PropsWithSx } from "types/PropsWithSx";
import React, { useCallback } from "react";
import LeadTimeAverageValue from "components/molecules/LeadTimeAverageValue/LeadTimeAverageValue";
import LeadTimeBreakdownSection from "components/molecules/LeadTimeBreakdownSection/LeadTimeBreakdownSection";
import { useIntl } from "react-intl";
import { useNavigate } from "hooks/useNavigate";

export type LeadTimeBreakdownProps = PropsWithSx;

function LeadTimeBreakdown({ sx }: LeadTimeBreakdownProps) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const onClick = useCallback(() => navigate("teamGoals"), [navigate]);

  return (
    <Card sx={{ padding: (theme) => theme.spacing(2), ...sx }}>
      <LeadTimeAverageValue
        value="2 days 8 hours"
        tendency={33}
        subtitle={formatMessage({ id: "lead-time.average-subtitle" })}
      />
      <Box sx={{ display: "flex", padding: (theme) => theme.spacing(3) }}>
        <LeadTimeBreakdownSection
          label={formatMessage({ id: "lead-time.coding" })}
          value="1d, 3h"
          tendency={33}
          color="orange"
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
        <LeadTimeBreakdownSection
          label={formatMessage({ id: "lead-time.review-lag" })}
          value="1d, 3h"
          tendency={33}
          color="orange"
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
        <LeadTimeBreakdownSection
          label={formatMessage({ id: "lead-time.review" })}
          value="1d, 3h"
          tendency={33}
          color="orange"
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
        <LeadTimeBreakdownSection
          label={formatMessage({ id: "lead-time.deploy" })}
          value="1d, 3h"
          tendency={33}
          color="orange"
          action={{
            label: formatMessage({ id: "lead-time.improve-button-label" }),
            onClick,
          }}
        />
      </Box>
    </Card>
  );
}

export default LeadTimeBreakdown;
