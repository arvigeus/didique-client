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
  children: any
};

const Icon = ({
  className,
  link,
  children,
  badge,
  badgeClass
}: IconPropType) => {
  const badgeIcon =
    badge && badge > 0 ? (
      <div className={cx(styles.badge, badgeClass)}>
        {badge > 99 ? "**" : badge}
      </div>
    ) : null;
  return link ? (
    <Link to={link} className={cx([styles.icon, className])}>
      {children}
      {badgeIcon}
    </Link>
  ) : (
    <div className={cx([styles.icon, className])}>
      {children}
      {badgeIcon}
    </div>
  );
};

export default Icon;
