# CaremonitorTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.


##  Setup Instructions
### 1. Clone the Repo
```bash
git clone https://github.com/Annie92/caremonitor-test.git
cd caremonitor-test
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Run development server
```bash
ng s
```
### 4. Navigate to App
Visit http://localhost:4200


##  To Run Tests
### 1. Running unit test 
```bash
ng test
```
### 2. Running end-to-end tests
For end-to-end (e2e) testing, run:
```bash
ng e2e
```
Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



#  Angular(19) Caremonitor Interview Challenge Demo App
This is a simple Angular(19) application that demonstrates:

- Login and authentication using ngx-cookie-service
- Route protection (guards)
- Dashboard and item list pages
- API integration using Angular services
- State management with `Signal Store` in list items page
- Angular Material UI
- Lazy loading with list items page
- Loading spinners and error handling in login form

---


## Architecture Overview
## Folder Structure
src/
├── app/
│   ├── core/               # Core module ( interceptors )
│   ├── shared/             # Shared module (Reusable components, services, pipes, directives)
│   ├── auth/               # Auth Module (Login component, auth service, auth guard)
│   ├── features/           # Feature modules (list),  feature components (dashboard)
│   ├── layout              # Main layout component
│   └── app-routing.module.ts


