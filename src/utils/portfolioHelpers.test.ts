import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoHref,
  filterProjectsByCategory,
  filterSkillsByCategory,
  getDisplayInitials,
  getImageFrameStyle,
  getProjectCategories,
  getVisibleNavItems,
  validateContactForm,
} from './portfolioHelpers';
import { portfolioConfig } from '../config/portfolioConfig';

test('validateContactForm rejects empty or malformed fields', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: 'not-an-email',
    subject: 'Hi',
    message: 'Too short',
  });

  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.subject);
  assert.ok(emptyResult.errors.message);
});

test('validateContactForm accepts valid input', () => {
  const validResult = validateContactForm({
    name: 'Alex Rivera',
    email: 'alex@example.com',
    subject: 'Frontend role inquiry',
    message: 'Hello, I would love to discuss an upcoming web development project with you.',
  });

  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoHref encodes recipient, subject, and body with %20 spaces', () => {
  const href = buildMailtoHref('dev@example.com', {
    name: 'Sam Lee',
    email: 'sam@example.com',
    subject: 'Project Inquiry',
    message: 'Let us collaborate on a web app.',
  });

  assert.ok(href.startsWith('mailto:dev@example.com?'));
  assert.ok(href.includes('subject=Project%20Inquiry'));
  assert.ok(href.includes('Sam%20Lee'));
  assert.equal(href.includes('+'), false);
});

test('getImageFrameStyle clamps coordinates and zoom scale safely', () => {
  const clamped = getImageFrameStyle({
    src: '/images/test.jpg',
    alt: 'Test',
    objectPositionX: 150,
    objectPositionY: -20,
    scale: 4,
  });

  assert.equal(clamped.objectPosition, '100% 0%');
  assert.equal(clamped.transform, 'scale(2.2)');

  const identity = getImageFrameStyle({
    src: '/images/test.jpg',
    alt: 'Test',
    objectPositionX: 50,
    objectPositionY: 25,
    scale: 1,
  });

  assert.equal(identity.objectPosition, '50% 25%');
  assert.equal(identity.transform, undefined);
});

test('getVisibleNavItems hides Testimonials when none exist and shows it when provided', () => {
  const withoutTestimonials = getVisibleNavItems([]);
  assert.equal(
    withoutTestimonials.some((item) => item.id === 'testimonials'),
    false
  );

  const withTestimonials = getVisibleNavItems([
    {
      id: 't1',
      quote: 'Great work.',
      authorName: 'Jordan Park',
      authorRole: 'Engineering Lead',
      organization: 'Northstar Labs',
    },
  ]);
  assert.equal(
    withTestimonials.some((item) => item.id === 'testimonials'),
    true
  );
});

test('project and skill filtering returns accurate subsets', () => {
  const categories = getProjectCategories(portfolioConfig.projects);
  assert.equal(categories[0], 'All');
  assert.ok(categories.includes('Cloud Lakehouse'));

  const allProjects = filterProjectsByCategory(portfolioConfig.projects, 'All');
  assert.equal(allProjects.length, portfolioConfig.projects.length);

  const lakehouseProjects = filterProjectsByCategory(portfolioConfig.projects, 'Cloud Lakehouse');
  assert.equal(lakehouseProjects.length, 1);
  assert.equal(lakehouseProjects[0].category, 'Cloud Lakehouse');

  const azureSkills = filterSkillsByCategory(portfolioConfig.skills, 'Azure & Big Data');
  assert.ok(azureSkills.length > 0);
  assert.ok(azureSkills.every((s) => s.category === 'Azure & Big Data'));
});

test('getDisplayInitials handles placeholder brackets and real names', () => {
  assert.equal(getDisplayInitials('[COUSIN FIRST NAME]', '[COUSIN LAST NAME]', 'DP'), 'DP');
  assert.equal(getDisplayInitials('Lanka Sanyasi', 'Patrudu', 'LP'), 'LP');
});
