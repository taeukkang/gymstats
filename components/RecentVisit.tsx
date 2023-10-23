import prisma from "@/lib/prisma";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";
import { Prisma, GymVisit } from "@prisma/client";
import { formatDistanceToNow, isToday } from "date-fns";

async function getRecentVisit() {
  const visit = await prisma.gymVisit.findFirst({
    orderBy: {
      checkIn: "desc",
    },
  });

  if (!visit) {
    return null;
  }

  return visit;
}

export default async function RecentVisit() {
  const visit = await getRecentVisit();

  if (!visit) {
    return <ErrorAlert />;
  }

  if (isToday(visit.checkIn)) {
    return <VisitedTodayAlert visit={visit} />;
  }

  return <VisitedNotTodayAlert visit={visit} />;
}

type RecentVisitAlertProps = {
  visit: GymVisit;
};

const VisitedTodayAlert: React.FC<RecentVisitAlertProps> = ({ visit }) => (
  <Alert status="success">
    <AlertIcon />
    <Box>
      <AlertTitle>Checked in today</AlertTitle>
      <AlertDescription>Taeuk worked out at the gym today!</AlertDescription>
    </Box>
  </Alert>
);

const VisitedNotTodayAlert: React.FC<RecentVisitAlertProps> = ({ visit }) => (
  <Alert status="warning">
    <AlertIcon />
    <Box>
      <AlertTitle>No check-in today</AlertTitle>
      <AlertDescription>
        Taeuk hasn&apos;t visited the gym. The most recent visit was{" "}
        {formatDistanceToNow(visit.checkIn)} ago.
      </AlertDescription>
    </Box>
  </Alert>
);

const ErrorAlert: React.FC = () => (
  <Alert status="error">
    <AlertIcon />
    <Box>
      <AlertTitle>Cannot load recent visit data</AlertTitle>
      <AlertDescription>
        It seems like there was an error loading the recent visit data or no
        visit has been logged at all.
      </AlertDescription>
    </Box>
  </Alert>
);
