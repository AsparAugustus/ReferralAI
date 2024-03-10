# Symptom Checker

## Getting Started

You will need an API token and a API key in your `.env` file (see `example.env`)

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Personalisation

The widget is customisable by passing the following query parameters:

- primaryColor - e.g. `primaryColor=FF69B4`. Note, do not include the hex
- logo - e.g. `logo=https://mylogo`. Note the image should be **_150 x 50_**
- user details: you can pass through any combination of the following parameters relating to a user. This will bring up a confirmation screen for the user to confirm the details passed in the query parameters:
  - name
  - year_of_birth
  - gender
  - initial_symptom

Add your own Terms and Privacy links on the legal screen by:

- Head to `src/config/legal-links`
- Change variables `termsUrl` and `privacyUrl` to links of your choice

## Using Widget

To embed the widget on a web page use an iframe. Example:

```html
<iframe
  src="http://localhost:3000/?primaryColor=######&logo=####&name=######&year_of_birth=####&gender=######&initial_symptom=####"
  title="Healthily Widget"
  height="656px"
  width="100%"
>
</iframe>
```
