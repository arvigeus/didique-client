// @flow
import cx from "classnames";
import React from "react";
import styles from "./icon.module.css";

type IconPropType = {
  className?: string,
  badge?: number,
  badgeClass?: string,
  disabled?: boolean,
  children: any
};

const Icon = ({
  className,
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
  return (
    <div className={iconClass} {...props}>
      {children}
      {badgeIcon}
    </div>
  );
};

export default Icon;
