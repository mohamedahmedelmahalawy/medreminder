import { useEffect, useId, useState } from "react";
import { ListFilterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type Filters = {
  realTime: boolean;
  topChannels: boolean;
  lastOrders: boolean;
  totalSpent: boolean;
};

type Props = {
  value: Filters;
  onApply: (next: Filters) => void;
  onClear: () => void;
};

export default function FilterInput({ value, onApply, onClear }: Props) {
  const id = useId();
  // local draft so the popover isn’t “live” until Apply is clicked
  const [draft, setDraft] = useState<Filters>(value);

  useEffect(() => setDraft(value), [value]);
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="default" aria-label="Filters">
            <ListFilterIcon size={16} aria-hidden="true" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-36 p-3">
          <div className="space-y-3">
            <div className="text-muted-foreground text-xs font-medium">Filters</div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-1`}
                    checked={draft.realTime}
                    onCheckedChange={(v) => setDraft(d => ({ ...d, realTime: !!v }))}
                  />
                  <Label htmlFor={`${id}-1`} className="font-normal">Real Time</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-2`}
                    checked={draft.topChannels}
                    onCheckedChange={(v) => setDraft(d => ({ ...d, topChannels: !!v }))}
                  />
                  <Label htmlFor={`${id}-2`} className="font-normal">Top Channels</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-3`}
                    checked={draft.lastOrders}
                    onCheckedChange={(v) => setDraft(d => ({ ...d, lastOrders: !!v }))}
                  />
                  <Label htmlFor={`${id}-3`} className="font-normal">Last Orders</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-4`}
                    checked={draft.totalSpent}
                    onCheckedChange={(v) => setDraft(d => ({ ...d, totalSpent: !!v }))}
                  />
                  <Label htmlFor={`${id}-4`} className="font-normal">Total Spent</Label>
                </div>
              </div>

              <div role="separator" aria-orientation="horizontal" className="bg-border -mx-3 my-3 h-px" />

              <div className="flex justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2"
                  onClick={() => { onClear(); }}
                  type="button"
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => onApply(draft)}
                  type="button"
                >
                  Apply
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
