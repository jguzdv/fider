import "./Gravatar.scss";

import React from "react";
import { classSet, Fider } from "@fider/services";
import { User, isCollaborator } from "@fider/models";

interface GravatarProps {
  user?: User;
  size?: "small" | "normal" | "large";
}

export const Gravatar = (props: GravatarProps) => {
  const size = props.size || "normal";
  const id = props.user ? props.user.id : 0;
  const name = props.user ? props.user.name : "";
  const url = `${Fider.settings.assetsURL}/avatars/50/${id}/${encodeURIComponent(name || "?")}`;

  const className = classSet({
    "c-avatar": true,
    [`m-${size}`]: true,
    "m-staff": props.user && isCollaborator(props.user.role)
  });

  return <img className={className} title={name} src={url} />;
};
