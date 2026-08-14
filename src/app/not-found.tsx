import { Button, Result } from "antd";
import Link from "next/link";

import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="container page">
      <div className="surface-card" style={{ padding: "24px 0" }}>
        <Result
          status="404"
          title="We could not find that page"
          subTitle="The product may have sold out or the link may be out of date."
          extra={
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Link href={ROUTES.products}>
                <Button type="primary" size="large">
                  Browse the catalogue
                </Button>
              </Link>
              <Link href={ROUTES.home}>
                <Button size="large">Back to home</Button>
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
}
