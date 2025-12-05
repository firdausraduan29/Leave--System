import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ApplyLeaveFormProps {
  onSubmit?: (data: LeaveFormData) => void;
  onCancel?: () => void;
}

export interface LeaveFormData {
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  document?: File;
}

export function ApplyLeaveForm({ onSubmit, onCancel }: ApplyLeaveFormProps) {
  const { toast } = useToast();
  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reason, setReason] = useState("");
  const [document, setDocument] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalDays = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (endDate < startDate) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // todo: remove mock functionality
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Leave Request Submitted",
      description: `Your ${leaveType.toLowerCase()} leave request for ${totalDays} day(s) has been submitted for approval.`,
    });

    onSubmit?.({ leaveType, startDate, endDate, reason, document });
    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Apply for Leave</CardTitle>
        <CardDescription>
          Submit a new leave request. Your request will be reviewed by HR and your manager.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="leave-type">Leave Type *</Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger id="leave-type" data-testid="select-leave-type">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Annual">Annual Leave</SelectItem>
                <SelectItem value="Medical">Medical Leave</SelectItem>
                <SelectItem value="Emergency">Emergency Leave</SelectItem>
                <SelectItem value="Unpaid">Unpaid Leave</SelectItem>
                <SelectItem value="Maternity">Maternity Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="button-start-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="button-end-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => startDate ? date < startDate : false}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {totalDays > 0 && (
            <div className="rounded-lg bg-muted p-3 text-sm">
              <span className="font-medium">Total Duration:</span> {totalDays} {totalDays === 1 ? "day" : "days"}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a brief reason for your leave request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-24"
              data-testid="input-reason"
            />
          </div>

          {leaveType === "Medical" && (
            <div className="space-y-2">
              <Label htmlFor="document">Medical Certificate (Optional)</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setDocument(e.target.files?.[0])}
                  className="hidden"
                  data-testid="input-document"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.document.getElementById("document")?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {document ? document.name : "Upload Document"}
                </Button>
                {document && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setDocument(undefined)}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4 flex-wrap">
            <Button type="submit" disabled={isSubmitting} data-testid="button-submit-leave">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
