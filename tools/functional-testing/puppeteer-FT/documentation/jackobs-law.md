# Jakob's Law Testing

## Overview

Jakob's Law states that "users spend most of their time on other sites" and therefore, "users prefer your site to work the same way as all the other sites they already know." This means that leveraging familiar design patterns can enhance usability. 

This test suite is designed to verify that your site's design patterns are consistent with common user expectations. It includes tests for common UI elements and their behavior to ensure they align with standard conventions.

## Test Suite Description

### Dependencies

Ensure the following dependencies are installed:

- `jest`
- `jest-puppeteer`
- `puppeteer`
- `dotenv`

### Environment Variables

Create a `.env` file in the root of your project with the following content:

```plaintext
HOME_URL=https://example.com/home
CONTACT_URL=https://example.com/contact
ABOUT_URL=https://example.com/about

# Key Performance Indicators (KPIs)

To determine if Jakob's Law is being followed, the following KPIs should be monitored:

## Presence of Common UI Elements

- Navigation bar (`<nav>`).
- Logo link (`<a class="logo">`).
- Buttons with consistent styles.
- Common form input types.

## Functionality of UI Elements

- Navigation links should work as expected.
- Logo should navigate back to the home page.
- Buttons should have consistent styles and expected behaviors.
- Form inputs should be present and correctly typed.

## User Feedback

- Collect subjective feedback from users regarding the familiarity and ease of use of the site. Higher satisfaction scores indicate better adherence to Jakob's Law.

## Consistency with Common Patterns

- Ensure that the design and behavior of UI elements align with common design patterns users are familiar with from other sites.

By adhering to Jakob's Law, your site will benefit from improved usability, as users will find it easier and more intuitive to navigate and interact with familiar design patterns.
