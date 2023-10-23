import { Container, Heading } from "@chakra-ui/react";

import RecentVisit from "@/components/RecentVisit";

export const dynamic = "force-dynamic";

async function getPreviousVisit() {}

export default async function Home() {
  return (
    <main>
      <Container>
        <Heading as="h1" size="lg">
          gymstats.taeuk
        </Heading>
        <RecentVisit />
      </Container>
    </main>
  );
}
