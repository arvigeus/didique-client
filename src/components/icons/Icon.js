// @flow
import cx from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./icon.module.css";

type IconPropType = {
  className?: string,
  link?: ?string,
  badge?: number,
  badgeClass?: string,
  disabled?: boolean,
  children: any
};

const Icon = ({
  className,
  link,
  children,
  badge,
  badgeClass,
  disabled,
  ...props
}: IconPropType) => {
  const badgeIcon =
    badge && badge > 0 ? (
      <div className={cx(styles.badge, badgeClass)}>
        {badge > 99 ? "**" : badge}
      </div>
    ) : null;
  const iconClass = cx([
    styles.icon,
    { [styles["disabled-icon"]]: disabled },
    className
  ]);
  return link ? (
    <Link to={link} className={iconClass} {...props} draggable={false}>
      {children}
      {badgeIcon}
    </Link>
  ) : (
    <div className={iconClass} {...props}>
      {children}
      {badgeIcon}
    </div>
  );
};

export default Icon;
