// src/app/dashboard/recruiter/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Title,
  Text,
  Button,
  Group,
  Tooltip,
  Badge,
  Center,
  Loader,
} from '@mantine/core';
import { IconPlus, IconUsers, IconListCheck, IconActivity, IconClipboardText } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Projects', value: 14, icon: IconClipboardText },
  { label: 'Candidates', value: 342, icon: IconUsers },
  { label: 'Shortlisted', value: 89, icon: IconListCheck },
  { label: 'Waitlisted', value: 42, icon: IconActivity },
];

const projects = [
  {
    id: 1,
    title: 'React Developer - Fintech',
    date: 'Apr 1, 2025',
    resumes: 34,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'AI Engineer - LLM Focus',
    date: 'Apr 5, 2025',
    resumes: 60,
    status: 'Processing',
  },
  {
    id: 3,
    title: 'Product Designer - UX',
    date: 'Mar 30, 2025',
    resumes: 21,
    status: 'Completed',
  },
];

export default function RecruiterDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <Container fluid p="md" style={{ minHeight: '100vh' }}>
      <Grid gutter="xl">
        {/* Sidebar */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Title order={2} mb="lg">Mock'n-Hire</Title>
          <Group direction="column" spacing="sm">
            <Button fullWidth variant="light" leftIcon={<IconClipboardText size={18} />}>Dashboard</Button>
            <Button fullWidth variant="light" leftIcon={<IconUsers size={18} />} color="gray">Talent Pool</Button>
            <Button fullWidth variant="light" leftIcon={<IconActivity size={18} />} color="gray">Settings</Button>
          </Group>
        </Grid.Col>

        {/* Main Content */}
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Group position="apart" mb="lg">
            <div>
              <Title order={3}>Recruiter Dashboard</Title>
              <Text size="sm" color="dimmed">Manage your projects and track candidates</Text>
            </div>
            <Button leftIcon={<IconPlus size={18} />} color="blue">New Project</Button>
          </Group>

          {/* Stats */}
          <Grid gutter="md" mb="xl">
            {stats.map((item, idx) => (
              <Grid.Col key={idx} span={6} md={3}>
                <Paper withBorder shadow="xs" p="md">
                  <Group spacing="xs" mb="xs">
                    <item.icon size={20} color="blue" />
                    <Text size="xs" color="dimmed">{item.label}</Text>
                  </Group>
                  <Text size="lg" weight={600}>{item.value}</Text>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>

          {/* Project Cards */}
          <Grid gutter="lg">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Grid.Col key={i} span={12} md={4}>
                  <Center style={{ height: 100 }}><Loader size="sm" /></Center>
                </Grid.Col>
              ))
            ) : (
              projects.map((proj) => (
                <Grid.Col key={proj.id} span={12} md={4}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 250 }}>
                    <Paper withBorder shadow="sm" p="md" radius="md" style={{ cursor: 'pointer' }}>
                      <Title order={5} mb="xs">{proj.title}</Title>
                      <Text size="xs" color="dimmed">{proj.date}</Text>
                      <Group position="apart" mt="sm">
                        <Text size="sm">{proj.resumes} resumes</Text>
                        <Badge color={proj.status === 'Completed' ? 'green' : 'yellow'}>{proj.status}</Badge>
                      </Group>
                      <Group position="right" mt="xs">
                        <Tooltip label="View Project">
                          <Text size="sm" weight={500} color="blue" style={{ cursor: 'pointer' }}>
                            View →
                          </Text>
                        </Tooltip>
                      </Group>
                    </Paper>
                  </motion.div>
                </Grid.Col>
              ))
            )}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}