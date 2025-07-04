/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as VerifiedImport } from './routes/verified';
import { Route as RegisterImport } from './routes/register';
import { Route as SetupMfaImport } from './routes/Setup-mfa';
import { Route as LoginImport } from './routes/Login';
import { Route as InputTotpImport } from './routes/Input-totp';
import { Route as IndexImport } from './routes/index';
import { Route as DashboardIndexImport } from './routes/dashboard/index';
import { Route as DashboardPrescriptionsIndexImport } from './routes/dashboard/prescriptions/index';
import { Route as DashboardPatientsIndexImport } from './routes/dashboard/patients/index';
import { Route as DashboardAppointmentsIndexImport } from './routes/dashboard/appointments/index';
import { Route as DashboardPrescriptionsCreateImport } from './routes/dashboard/prescriptions/create';
import { Route as DashboardPatientsCreateImport } from './routes/dashboard/patients/create';
import { Route as DashboardAppointmentsCreateImport } from './routes/dashboard/appointments/create';
import { Route as DashboardPrescriptionsPrescriptionIdIndexImport } from './routes/dashboard/prescriptions/$prescriptionId/index';
import { Route as DashboardPatientsPatientIdIndexImport } from './routes/dashboard/patients/$patientId/index';
import { Route as DashboardAppointmentsAppointmentIdIndexImport } from './routes/dashboard/appointments/$appointmentId/index';
import { Route as DashboardPrescriptionsPrescriptionIdEditImport } from './routes/dashboard/prescriptions/$prescriptionId/edit';
import { Route as DashboardPatientsPatientIdEditImport } from './routes/dashboard/patients/$patientId/edit';
import { Route as DashboardAppointmentsAppointmentIdEditImport } from './routes/dashboard/appointments/$appointmentId/edit';

// Create/Update Routes

const VerifiedRoute = VerifiedImport.update({
  id: '/verified',
  path: '/verified',
  getParentRoute: () => rootRoute,
} as any);

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any);

const SetupMfaRoute = SetupMfaImport.update({
  id: '/Setup-mfa',
  path: '/Setup-mfa',
  getParentRoute: () => rootRoute,
} as any);

const LoginRoute = LoginImport.update({
  id: '/Login',
  path: '/Login',
  getParentRoute: () => rootRoute,
} as any);

const InputTotpRoute = InputTotpImport.update({
  id: '/Input-totp',
  path: '/Input-totp',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any);

const DashboardPrescriptionsIndexRoute =
  DashboardPrescriptionsIndexImport.update({
    id: '/dashboard/prescriptions/',
    path: '/dashboard/prescriptions/',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardPatientsIndexRoute = DashboardPatientsIndexImport.update({
  id: '/dashboard/patients/',
  path: '/dashboard/patients/',
  getParentRoute: () => rootRoute,
} as any);

const DashboardAppointmentsIndexRoute = DashboardAppointmentsIndexImport.update(
  {
    id: '/dashboard/appointments/',
    path: '/dashboard/appointments/',
    getParentRoute: () => rootRoute,
  } as any
);

const DashboardPrescriptionsCreateRoute =
  DashboardPrescriptionsCreateImport.update({
    id: '/dashboard/prescriptions/create',
    path: '/dashboard/prescriptions/create',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardPatientsCreateRoute = DashboardPatientsCreateImport.update({
  id: '/dashboard/patients/create',
  path: '/dashboard/patients/create',
  getParentRoute: () => rootRoute,
} as any);

const DashboardAppointmentsCreateRoute =
  DashboardAppointmentsCreateImport.update({
    id: '/dashboard/appointments/create',
    path: '/dashboard/appointments/create',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardPrescriptionsPrescriptionIdIndexRoute =
  DashboardPrescriptionsPrescriptionIdIndexImport.update({
    id: '/dashboard/prescriptions/$prescriptionId/',
    path: '/dashboard/prescriptions/$prescriptionId/',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardPatientsPatientIdIndexRoute =
  DashboardPatientsPatientIdIndexImport.update({
    id: '/dashboard/patients/$patientId/',
    path: '/dashboard/patients/$patientId/',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardAppointmentsAppointmentIdIndexRoute =
  DashboardAppointmentsAppointmentIdIndexImport.update({
    id: '/dashboard/appointments/$appointmentId/',
    path: '/dashboard/appointments/$appointmentId/',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardPrescriptionsPrescriptionIdEditRoute =
  DashboardPrescriptionsPrescriptionIdEditImport.update({
    id: '/dashboard/prescriptions/$prescriptionId/edit',
    path: '/dashboard/prescriptions/$prescriptionId/edit',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardPatientsPatientIdEditRoute =
  DashboardPatientsPatientIdEditImport.update({
    id: '/dashboard/patients/$patientId/edit',
    path: '/dashboard/patients/$patientId/edit',
    getParentRoute: () => rootRoute,
  } as any);

const DashboardAppointmentsAppointmentIdEditRoute =
  DashboardAppointmentsAppointmentIdEditImport.update({
    id: '/dashboard/appointments/$appointmentId/edit',
    path: '/dashboard/appointments/$appointmentId/edit',
    getParentRoute: () => rootRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/Input-totp': {
      id: '/Input-totp';
      path: '/Input-totp';
      fullPath: '/Input-totp';
      preLoaderRoute: typeof InputTotpImport;
      parentRoute: typeof rootRoute;
    };
    '/Login': {
      id: '/Login';
      path: '/Login';
      fullPath: '/Login';
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    '/Setup-mfa': {
      id: '/Setup-mfa';
      path: '/Setup-mfa';
      fullPath: '/Setup-mfa';
      preLoaderRoute: typeof SetupMfaImport;
      parentRoute: typeof rootRoute;
    };
    '/register': {
      id: '/register';
      path: '/register';
      fullPath: '/register';
      preLoaderRoute: typeof RegisterImport;
      parentRoute: typeof rootRoute;
    };
    '/verified': {
      id: '/verified';
      path: '/verified';
      fullPath: '/verified';
      preLoaderRoute: typeof VerifiedImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/': {
      id: '/dashboard/';
      path: '/dashboard';
      fullPath: '/dashboard';
      preLoaderRoute: typeof DashboardIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/appointments/create': {
      id: '/dashboard/appointments/create';
      path: '/dashboard/appointments/create';
      fullPath: '/dashboard/appointments/create';
      preLoaderRoute: typeof DashboardAppointmentsCreateImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/patients/create': {
      id: '/dashboard/patients/create';
      path: '/dashboard/patients/create';
      fullPath: '/dashboard/patients/create';
      preLoaderRoute: typeof DashboardPatientsCreateImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/prescriptions/create': {
      id: '/dashboard/prescriptions/create';
      path: '/dashboard/prescriptions/create';
      fullPath: '/dashboard/prescriptions/create';
      preLoaderRoute: typeof DashboardPrescriptionsCreateImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/appointments/': {
      id: '/dashboard/appointments/';
      path: '/dashboard/appointments';
      fullPath: '/dashboard/appointments';
      preLoaderRoute: typeof DashboardAppointmentsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/patients/': {
      id: '/dashboard/patients/';
      path: '/dashboard/patients';
      fullPath: '/dashboard/patients';
      preLoaderRoute: typeof DashboardPatientsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/prescriptions/': {
      id: '/dashboard/prescriptions/';
      path: '/dashboard/prescriptions';
      fullPath: '/dashboard/prescriptions';
      preLoaderRoute: typeof DashboardPrescriptionsIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/appointments/$appointmentId/edit': {
      id: '/dashboard/appointments/$appointmentId/edit';
      path: '/dashboard/appointments/$appointmentId/edit';
      fullPath: '/dashboard/appointments/$appointmentId/edit';
      preLoaderRoute: typeof DashboardAppointmentsAppointmentIdEditImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/patients/$patientId/edit': {
      id: '/dashboard/patients/$patientId/edit';
      path: '/dashboard/patients/$patientId/edit';
      fullPath: '/dashboard/patients/$patientId/edit';
      preLoaderRoute: typeof DashboardPatientsPatientIdEditImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/prescriptions/$prescriptionId/edit': {
      id: '/dashboard/prescriptions/$prescriptionId/edit';
      path: '/dashboard/prescriptions/$prescriptionId/edit';
      fullPath: '/dashboard/prescriptions/$prescriptionId/edit';
      preLoaderRoute: typeof DashboardPrescriptionsPrescriptionIdEditImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/appointments/$appointmentId/': {
      id: '/dashboard/appointments/$appointmentId/';
      path: '/dashboard/appointments/$appointmentId';
      fullPath: '/dashboard/appointments/$appointmentId';
      preLoaderRoute: typeof DashboardAppointmentsAppointmentIdIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/patients/$patientId/': {
      id: '/dashboard/patients/$patientId/';
      path: '/dashboard/patients/$patientId';
      fullPath: '/dashboard/patients/$patientId';
      preLoaderRoute: typeof DashboardPatientsPatientIdIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/dashboard/prescriptions/$prescriptionId/': {
      id: '/dashboard/prescriptions/$prescriptionId/';
      path: '/dashboard/prescriptions/$prescriptionId';
      fullPath: '/dashboard/prescriptions/$prescriptionId';
      preLoaderRoute: typeof DashboardPrescriptionsPrescriptionIdIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/Input-totp': typeof InputTotpRoute;
  '/Login': typeof LoginRoute;
  '/Setup-mfa': typeof SetupMfaRoute;
  '/register': typeof RegisterRoute;
  '/verified': typeof VerifiedRoute;
  '/dashboard': typeof DashboardIndexRoute;
  '/dashboard/appointments/create': typeof DashboardAppointmentsCreateRoute;
  '/dashboard/patients/create': typeof DashboardPatientsCreateRoute;
  '/dashboard/prescriptions/create': typeof DashboardPrescriptionsCreateRoute;
  '/dashboard/appointments': typeof DashboardAppointmentsIndexRoute;
  '/dashboard/patients': typeof DashboardPatientsIndexRoute;
  '/dashboard/prescriptions': typeof DashboardPrescriptionsIndexRoute;
  '/dashboard/appointments/$appointmentId/edit': typeof DashboardAppointmentsAppointmentIdEditRoute;
  '/dashboard/patients/$patientId/edit': typeof DashboardPatientsPatientIdEditRoute;
  '/dashboard/prescriptions/$prescriptionId/edit': typeof DashboardPrescriptionsPrescriptionIdEditRoute;
  '/dashboard/appointments/$appointmentId': typeof DashboardAppointmentsAppointmentIdIndexRoute;
  '/dashboard/patients/$patientId': typeof DashboardPatientsPatientIdIndexRoute;
  '/dashboard/prescriptions/$prescriptionId': typeof DashboardPrescriptionsPrescriptionIdIndexRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/Input-totp': typeof InputTotpRoute;
  '/Login': typeof LoginRoute;
  '/Setup-mfa': typeof SetupMfaRoute;
  '/register': typeof RegisterRoute;
  '/verified': typeof VerifiedRoute;
  '/dashboard': typeof DashboardIndexRoute;
  '/dashboard/appointments/create': typeof DashboardAppointmentsCreateRoute;
  '/dashboard/patients/create': typeof DashboardPatientsCreateRoute;
  '/dashboard/prescriptions/create': typeof DashboardPrescriptionsCreateRoute;
  '/dashboard/appointments': typeof DashboardAppointmentsIndexRoute;
  '/dashboard/patients': typeof DashboardPatientsIndexRoute;
  '/dashboard/prescriptions': typeof DashboardPrescriptionsIndexRoute;
  '/dashboard/appointments/$appointmentId/edit': typeof DashboardAppointmentsAppointmentIdEditRoute;
  '/dashboard/patients/$patientId/edit': typeof DashboardPatientsPatientIdEditRoute;
  '/dashboard/prescriptions/$prescriptionId/edit': typeof DashboardPrescriptionsPrescriptionIdEditRoute;
  '/dashboard/appointments/$appointmentId': typeof DashboardAppointmentsAppointmentIdIndexRoute;
  '/dashboard/patients/$patientId': typeof DashboardPatientsPatientIdIndexRoute;
  '/dashboard/prescriptions/$prescriptionId': typeof DashboardPrescriptionsPrescriptionIdIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/Input-totp': typeof InputTotpRoute;
  '/Login': typeof LoginRoute;
  '/Setup-mfa': typeof SetupMfaRoute;
  '/register': typeof RegisterRoute;
  '/verified': typeof VerifiedRoute;
  '/dashboard/': typeof DashboardIndexRoute;
  '/dashboard/appointments/create': typeof DashboardAppointmentsCreateRoute;
  '/dashboard/patients/create': typeof DashboardPatientsCreateRoute;
  '/dashboard/prescriptions/create': typeof DashboardPrescriptionsCreateRoute;
  '/dashboard/appointments/': typeof DashboardAppointmentsIndexRoute;
  '/dashboard/patients/': typeof DashboardPatientsIndexRoute;
  '/dashboard/prescriptions/': typeof DashboardPrescriptionsIndexRoute;
  '/dashboard/appointments/$appointmentId/edit': typeof DashboardAppointmentsAppointmentIdEditRoute;
  '/dashboard/patients/$patientId/edit': typeof DashboardPatientsPatientIdEditRoute;
  '/dashboard/prescriptions/$prescriptionId/edit': typeof DashboardPrescriptionsPrescriptionIdEditRoute;
  '/dashboard/appointments/$appointmentId/': typeof DashboardAppointmentsAppointmentIdIndexRoute;
  '/dashboard/patients/$patientId/': typeof DashboardPatientsPatientIdIndexRoute;
  '/dashboard/prescriptions/$prescriptionId/': typeof DashboardPrescriptionsPrescriptionIdIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | '/'
    | '/Input-totp'
    | '/Login'
    | '/Setup-mfa'
    | '/register'
    | '/verified'
    | '/dashboard'
    | '/dashboard/appointments/create'
    | '/dashboard/patients/create'
    | '/dashboard/prescriptions/create'
    | '/dashboard/appointments'
    | '/dashboard/patients'
    | '/dashboard/prescriptions'
    | '/dashboard/appointments/$appointmentId/edit'
    | '/dashboard/patients/$patientId/edit'
    | '/dashboard/prescriptions/$prescriptionId/edit'
    | '/dashboard/appointments/$appointmentId'
    | '/dashboard/patients/$patientId'
    | '/dashboard/prescriptions/$prescriptionId';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | '/'
    | '/Input-totp'
    | '/Login'
    | '/Setup-mfa'
    | '/register'
    | '/verified'
    | '/dashboard'
    | '/dashboard/appointments/create'
    | '/dashboard/patients/create'
    | '/dashboard/prescriptions/create'
    | '/dashboard/appointments'
    | '/dashboard/patients'
    | '/dashboard/prescriptions'
    | '/dashboard/appointments/$appointmentId/edit'
    | '/dashboard/patients/$patientId/edit'
    | '/dashboard/prescriptions/$prescriptionId/edit'
    | '/dashboard/appointments/$appointmentId'
    | '/dashboard/patients/$patientId'
    | '/dashboard/prescriptions/$prescriptionId';
  id:
    | '__root__'
    | '/'
    | '/Input-totp'
    | '/Login'
    | '/Setup-mfa'
    | '/register'
    | '/verified'
    | '/dashboard/'
    | '/dashboard/appointments/create'
    | '/dashboard/patients/create'
    | '/dashboard/prescriptions/create'
    | '/dashboard/appointments/'
    | '/dashboard/patients/'
    | '/dashboard/prescriptions/'
    | '/dashboard/appointments/$appointmentId/edit'
    | '/dashboard/patients/$patientId/edit'
    | '/dashboard/prescriptions/$prescriptionId/edit'
    | '/dashboard/appointments/$appointmentId/'
    | '/dashboard/patients/$patientId/'
    | '/dashboard/prescriptions/$prescriptionId/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  InputTotpRoute: typeof InputTotpRoute;
  LoginRoute: typeof LoginRoute;
  SetupMfaRoute: typeof SetupMfaRoute;
  RegisterRoute: typeof RegisterRoute;
  VerifiedRoute: typeof VerifiedRoute;
  DashboardIndexRoute: typeof DashboardIndexRoute;
  DashboardAppointmentsCreateRoute: typeof DashboardAppointmentsCreateRoute;
  DashboardPatientsCreateRoute: typeof DashboardPatientsCreateRoute;
  DashboardPrescriptionsCreateRoute: typeof DashboardPrescriptionsCreateRoute;
  DashboardAppointmentsIndexRoute: typeof DashboardAppointmentsIndexRoute;
  DashboardPatientsIndexRoute: typeof DashboardPatientsIndexRoute;
  DashboardPrescriptionsIndexRoute: typeof DashboardPrescriptionsIndexRoute;
  DashboardAppointmentsAppointmentIdEditRoute: typeof DashboardAppointmentsAppointmentIdEditRoute;
  DashboardPatientsPatientIdEditRoute: typeof DashboardPatientsPatientIdEditRoute;
  DashboardPrescriptionsPrescriptionIdEditRoute: typeof DashboardPrescriptionsPrescriptionIdEditRoute;
  DashboardAppointmentsAppointmentIdIndexRoute: typeof DashboardAppointmentsAppointmentIdIndexRoute;
  DashboardPatientsPatientIdIndexRoute: typeof DashboardPatientsPatientIdIndexRoute;
  DashboardPrescriptionsPrescriptionIdIndexRoute: typeof DashboardPrescriptionsPrescriptionIdIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  InputTotpRoute: InputTotpRoute,
  LoginRoute: LoginRoute,
  SetupMfaRoute: SetupMfaRoute,
  RegisterRoute: RegisterRoute,
  VerifiedRoute: VerifiedRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  DashboardAppointmentsCreateRoute: DashboardAppointmentsCreateRoute,
  DashboardPatientsCreateRoute: DashboardPatientsCreateRoute,
  DashboardPrescriptionsCreateRoute: DashboardPrescriptionsCreateRoute,
  DashboardAppointmentsIndexRoute: DashboardAppointmentsIndexRoute,
  DashboardPatientsIndexRoute: DashboardPatientsIndexRoute,
  DashboardPrescriptionsIndexRoute: DashboardPrescriptionsIndexRoute,
  DashboardAppointmentsAppointmentIdEditRoute:
    DashboardAppointmentsAppointmentIdEditRoute,
  DashboardPatientsPatientIdEditRoute: DashboardPatientsPatientIdEditRoute,
  DashboardPrescriptionsPrescriptionIdEditRoute:
    DashboardPrescriptionsPrescriptionIdEditRoute,
  DashboardAppointmentsAppointmentIdIndexRoute:
    DashboardAppointmentsAppointmentIdIndexRoute,
  DashboardPatientsPatientIdIndexRoute: DashboardPatientsPatientIdIndexRoute,
  DashboardPrescriptionsPrescriptionIdIndexRoute:
    DashboardPrescriptionsPrescriptionIdIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/Input-totp",
        "/Login",
        "/Setup-mfa",
        "/register",
        "/verified",
        "/dashboard/",
        "/dashboard/appointments/create",
        "/dashboard/patients/create",
        "/dashboard/prescriptions/create",
        "/dashboard/appointments/",
        "/dashboard/patients/",
        "/dashboard/prescriptions/",
        "/dashboard/appointments/$appointmentId/edit",
        "/dashboard/patients/$patientId/edit",
        "/dashboard/prescriptions/$prescriptionId/edit",
        "/dashboard/appointments/$appointmentId/",
        "/dashboard/patients/$patientId/",
        "/dashboard/prescriptions/$prescriptionId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/Input-totp": {
      "filePath": "Input-totp.tsx"
    },
    "/Login": {
      "filePath": "Login.tsx"
    },
    "/Setup-mfa": {
      "filePath": "Setup-mfa.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/verified": {
      "filePath": "verified.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/dashboard/appointments/create": {
      "filePath": "dashboard/appointments/create.tsx"
    },
    "/dashboard/patients/create": {
      "filePath": "dashboard/patients/create.tsx"
    },
    "/dashboard/prescriptions/create": {
      "filePath": "dashboard/prescriptions/create.tsx"
    },
    "/dashboard/appointments/": {
      "filePath": "dashboard/appointments/index.tsx"
    },
    "/dashboard/patients/": {
      "filePath": "dashboard/patients/index.tsx"
    },
    "/dashboard/prescriptions/": {
      "filePath": "dashboard/prescriptions/index.tsx"
    },
    "/dashboard/appointments/$appointmentId/edit": {
      "filePath": "dashboard/appointments/$appointmentId/edit.tsx"
    },
    "/dashboard/patients/$patientId/edit": {
      "filePath": "dashboard/patients/$patientId/edit.tsx"
    },
    "/dashboard/prescriptions/$prescriptionId/edit": {
      "filePath": "dashboard/prescriptions/$prescriptionId/edit.tsx"
    },
    "/dashboard/appointments/$appointmentId/": {
      "filePath": "dashboard/appointments/$appointmentId/index.tsx"
    },
    "/dashboard/patients/$patientId/": {
      "filePath": "dashboard/patients/$patientId/index.tsx"
    },
    "/dashboard/prescriptions/$prescriptionId/": {
      "filePath": "dashboard/prescriptions/$prescriptionId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
