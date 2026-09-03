import { Table, TableBody, TableHead, TableRow, TableTd, TableTh } from "@noorddev/raster-react";
import { UseField } from "../use-frame";
export function Use() {
  return (
    <UseField name="table">
      <h3 className="rs-use-type">Plan</h3>
      <div className="rs-use-body">
        <div className="rs-use-stack">
          <p className="rs-use-kicker">The job</p>
          <p className="rs-use-copy">Phases in weeks. Hairline rows, no zebra hue.</p>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableTh>Phase</TableTh>
              <TableTh>Weeks</TableTh>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableTd>Strategy</TableTd>
              <TableTd>2</TableTd>
            </TableRow>
            <TableRow>
              <TableTd>Identity</TableTd>
              <TableTd>4</TableTd>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </UseField>
  );
}
