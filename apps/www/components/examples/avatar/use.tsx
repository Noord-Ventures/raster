import { Avatar, AvatarRow } from "@noorddev/raster-react";

export function Use() {
  return (
    <article className="rs-use" data-use="avatar">
      <h3 className="rs-use-type">Desk</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">On the desk</p>
          <p className="rs-use-copy">Initials on paper. No photograph required.</p>
        </div>
        <AvatarRow>
          <Avatar initials="RV" />
          <Avatar initials="N" />
          <Avatar initials="R" />
        </AvatarRow>
      </div>
    </article>
  );
}
