import EmergencyBadge from "@media/emergency-badge.svg";
import UrgentBadge from "@media/urgent-badge.svg";
import NoOutcomeBadge from "@media/nooutcome-badge.svg";
import SelfcareBadge from "@media/selfcare-badge.svg";
import RoutineBadge from "@media/routine-badge.svg";

import { Wrapper } from "./badge.styles";
import Image from "next/image";
import classNames from "classnames";
import React from "react";

const iconsMap: Record<string, string> = {
  danger: EmergencyBadge,
  warning: UrgentBadge,
  "no-outcome": NoOutcomeBadge,
  success: SelfcareBadge,
  info: RoutineBadge,
};

const Badge: React.FC<{ kind: string }> = ({ kind }) => {
  const Icon = iconsMap[kind];

  return (
    <Wrapper className={classNames({ [`kind-${kind}`]: kind })}>
      {Icon && <Image src={Icon} width={20} alt={kind} />}
    </Wrapper>
  );
};

export default Badge;
