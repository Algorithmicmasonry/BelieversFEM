import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ViewStoreButton from "@/global/view-store-button";

export function SidebarViewStoreCard() {
  return (
    <Card className="gap-2 py-4 shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="text-sm text-center">View Your Store Here</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="grid gap-2.5">
         <ViewStoreButton/>
        </div>
      </CardContent>
    </Card>
  );
}
