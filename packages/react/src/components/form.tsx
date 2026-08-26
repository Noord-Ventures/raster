import * as React from "react";
import { cx } from "../cx";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

/** Native form. Fields stack. One primary action at the end. */
export function Form({ className, ...props }: FormProps) {
  return <form className={cx("rs-form", className)} {...props} />;
}
