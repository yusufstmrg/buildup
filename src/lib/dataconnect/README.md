# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `buildup-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserOrganizations*](#getuserorganizations)
  - [*GetBusinessProfile*](#getbusinessprofile)
  - [*GetBusinessGenome*](#getbusinessgenome)
  - [*GetInitiatives*](#getinitiatives)
- [**Mutations**](#mutations)
  - [*CreateOrganization*](#createorganization)
  - [*UpdateGenomeMetric*](#updategenomemetric)
  - [*CreateInitiative*](#createinitiative)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `buildup-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@buildup/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@buildup/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@buildup/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `buildup-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserOrganizations
You can execute the `GetUserOrganizations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getUserOrganizations(vars: GetUserOrganizationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserOrganizationsData, GetUserOrganizationsVariables>;

interface GetUserOrganizationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserOrganizationsVariables): QueryRef<GetUserOrganizationsData, GetUserOrganizationsVariables>;
}
export const getUserOrganizationsRef: GetUserOrganizationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserOrganizations(dc: DataConnect, vars: GetUserOrganizationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserOrganizationsData, GetUserOrganizationsVariables>;

interface GetUserOrganizationsRef {
  ...
  (dc: DataConnect, vars: GetUserOrganizationsVariables): QueryRef<GetUserOrganizationsData, GetUserOrganizationsVariables>;
}
export const getUserOrganizationsRef: GetUserOrganizationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserOrganizationsRef:
```typescript
const name = getUserOrganizationsRef.operationName;
console.log(name);
```

### Variables
The `GetUserOrganizations` query requires an argument of type `GetUserOrganizationsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserOrganizationsVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `GetUserOrganizations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserOrganizationsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserOrganizationsData {
  memberships: ({
    id: UUIDString;
    role: string;
    organization: {
      id: UUIDString;
      name: string;
      createdAt: TimestampString;
    } & Organization_Key;
  } & Membership_Key)[];
}
```
### Using `GetUserOrganizations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserOrganizations, GetUserOrganizationsVariables } from '@buildup/dataconnect';

// The `GetUserOrganizations` query requires an argument of type `GetUserOrganizationsVariables`:
const getUserOrganizationsVars: GetUserOrganizationsVariables = {
  uid: ..., 
};

// Call the `getUserOrganizations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserOrganizations(getUserOrganizationsVars);
// Variables can be defined inline as well.
const { data } = await getUserOrganizations({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserOrganizations(dataConnect, getUserOrganizationsVars);

console.log(data.memberships);

// Or, you can use the `Promise` API.
getUserOrganizations(getUserOrganizationsVars).then((response) => {
  const data = response.data;
  console.log(data.memberships);
});
```

### Using `GetUserOrganizations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserOrganizationsRef, GetUserOrganizationsVariables } from '@buildup/dataconnect';

// The `GetUserOrganizations` query requires an argument of type `GetUserOrganizationsVariables`:
const getUserOrganizationsVars: GetUserOrganizationsVariables = {
  uid: ..., 
};

// Call the `getUserOrganizationsRef()` function to get a reference to the query.
const ref = getUserOrganizationsRef(getUserOrganizationsVars);
// Variables can be defined inline as well.
const ref = getUserOrganizationsRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserOrganizationsRef(dataConnect, getUserOrganizationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.memberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.memberships);
});
```

## GetBusinessProfile
You can execute the `GetBusinessProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getBusinessProfile(vars: GetBusinessProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;

interface GetBusinessProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
}
export const getBusinessProfileRef: GetBusinessProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getBusinessProfile(dc: DataConnect, vars: GetBusinessProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessProfileData, GetBusinessProfileVariables>;

interface GetBusinessProfileRef {
  ...
  (dc: DataConnect, vars: GetBusinessProfileVariables): QueryRef<GetBusinessProfileData, GetBusinessProfileVariables>;
}
export const getBusinessProfileRef: GetBusinessProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getBusinessProfileRef:
```typescript
const name = getBusinessProfileRef.operationName;
console.log(name);
```

### Variables
The `GetBusinessProfile` query requires an argument of type `GetBusinessProfileVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetBusinessProfileVariables {
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `GetBusinessProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetBusinessProfileData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetBusinessProfileData {
  businessProfiles: ({
    id: UUIDString;
    industry: string;
    revenueRange?: string | null;
    headcount?: number | null;
    currency: string;
  } & BusinessProfile_Key)[];
}
```
### Using `GetBusinessProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getBusinessProfile, GetBusinessProfileVariables } from '@buildup/dataconnect';

// The `GetBusinessProfile` query requires an argument of type `GetBusinessProfileVariables`:
const getBusinessProfileVars: GetBusinessProfileVariables = {
  orgId: ..., 
};

// Call the `getBusinessProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getBusinessProfile(getBusinessProfileVars);
// Variables can be defined inline as well.
const { data } = await getBusinessProfile({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getBusinessProfile(dataConnect, getBusinessProfileVars);

console.log(data.businessProfiles);

// Or, you can use the `Promise` API.
getBusinessProfile(getBusinessProfileVars).then((response) => {
  const data = response.data;
  console.log(data.businessProfiles);
});
```

### Using `GetBusinessProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getBusinessProfileRef, GetBusinessProfileVariables } from '@buildup/dataconnect';

// The `GetBusinessProfile` query requires an argument of type `GetBusinessProfileVariables`:
const getBusinessProfileVars: GetBusinessProfileVariables = {
  orgId: ..., 
};

// Call the `getBusinessProfileRef()` function to get a reference to the query.
const ref = getBusinessProfileRef(getBusinessProfileVars);
// Variables can be defined inline as well.
const ref = getBusinessProfileRef({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getBusinessProfileRef(dataConnect, getBusinessProfileVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.businessProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.businessProfiles);
});
```

## GetBusinessGenome
You can execute the `GetBusinessGenome` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getBusinessGenome(vars: GetBusinessGenomeVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessGenomeData, GetBusinessGenomeVariables>;

interface GetBusinessGenomeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBusinessGenomeVariables): QueryRef<GetBusinessGenomeData, GetBusinessGenomeVariables>;
}
export const getBusinessGenomeRef: GetBusinessGenomeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getBusinessGenome(dc: DataConnect, vars: GetBusinessGenomeVariables, options?: ExecuteQueryOptions): QueryPromise<GetBusinessGenomeData, GetBusinessGenomeVariables>;

interface GetBusinessGenomeRef {
  ...
  (dc: DataConnect, vars: GetBusinessGenomeVariables): QueryRef<GetBusinessGenomeData, GetBusinessGenomeVariables>;
}
export const getBusinessGenomeRef: GetBusinessGenomeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getBusinessGenomeRef:
```typescript
const name = getBusinessGenomeRef.operationName;
console.log(name);
```

### Variables
The `GetBusinessGenome` query requires an argument of type `GetBusinessGenomeVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetBusinessGenomeVariables {
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `GetBusinessGenome` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetBusinessGenomeData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetBusinessGenomeData {
  businessGenomes: ({
    id: UUIDString;
    dimension: string;
    metricKey: string;
    metricValue?: number | null;
    confidence: number;
    provenance?: string | null;
    lastUpdated: TimestampString;
  } & BusinessGenome_Key)[];
}
```
### Using `GetBusinessGenome`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getBusinessGenome, GetBusinessGenomeVariables } from '@buildup/dataconnect';

// The `GetBusinessGenome` query requires an argument of type `GetBusinessGenomeVariables`:
const getBusinessGenomeVars: GetBusinessGenomeVariables = {
  orgId: ..., 
};

// Call the `getBusinessGenome()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getBusinessGenome(getBusinessGenomeVars);
// Variables can be defined inline as well.
const { data } = await getBusinessGenome({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getBusinessGenome(dataConnect, getBusinessGenomeVars);

console.log(data.businessGenomes);

// Or, you can use the `Promise` API.
getBusinessGenome(getBusinessGenomeVars).then((response) => {
  const data = response.data;
  console.log(data.businessGenomes);
});
```

### Using `GetBusinessGenome`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getBusinessGenomeRef, GetBusinessGenomeVariables } from '@buildup/dataconnect';

// The `GetBusinessGenome` query requires an argument of type `GetBusinessGenomeVariables`:
const getBusinessGenomeVars: GetBusinessGenomeVariables = {
  orgId: ..., 
};

// Call the `getBusinessGenomeRef()` function to get a reference to the query.
const ref = getBusinessGenomeRef(getBusinessGenomeVars);
// Variables can be defined inline as well.
const ref = getBusinessGenomeRef({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getBusinessGenomeRef(dataConnect, getBusinessGenomeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.businessGenomes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.businessGenomes);
});
```

## GetInitiatives
You can execute the `GetInitiatives` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getInitiatives(vars: GetInitiativesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInitiativesData, GetInitiativesVariables>;

interface GetInitiativesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInitiativesVariables): QueryRef<GetInitiativesData, GetInitiativesVariables>;
}
export const getInitiativesRef: GetInitiativesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInitiatives(dc: DataConnect, vars: GetInitiativesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInitiativesData, GetInitiativesVariables>;

interface GetInitiativesRef {
  ...
  (dc: DataConnect, vars: GetInitiativesVariables): QueryRef<GetInitiativesData, GetInitiativesVariables>;
}
export const getInitiativesRef: GetInitiativesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInitiativesRef:
```typescript
const name = getInitiativesRef.operationName;
console.log(name);
```

### Variables
The `GetInitiatives` query requires an argument of type `GetInitiativesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInitiativesVariables {
  orgId: UUIDString;
}
```
### Return Type
Recall that executing the `GetInitiatives` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInitiativesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetInitiativesData {
  initiatives: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    status: string;
    expectedRoi?: number | null;
    department: string;
    owner: {
      displayName?: string | null;
      email: string;
    };
  } & Initiative_Key)[];
}
```
### Using `GetInitiatives`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInitiatives, GetInitiativesVariables } from '@buildup/dataconnect';

// The `GetInitiatives` query requires an argument of type `GetInitiativesVariables`:
const getInitiativesVars: GetInitiativesVariables = {
  orgId: ..., 
};

// Call the `getInitiatives()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInitiatives(getInitiativesVars);
// Variables can be defined inline as well.
const { data } = await getInitiatives({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInitiatives(dataConnect, getInitiativesVars);

console.log(data.initiatives);

// Or, you can use the `Promise` API.
getInitiatives(getInitiativesVars).then((response) => {
  const data = response.data;
  console.log(data.initiatives);
});
```

### Using `GetInitiatives`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInitiativesRef, GetInitiativesVariables } from '@buildup/dataconnect';

// The `GetInitiatives` query requires an argument of type `GetInitiativesVariables`:
const getInitiativesVars: GetInitiativesVariables = {
  orgId: ..., 
};

// Call the `getInitiativesRef()` function to get a reference to the query.
const ref = getInitiativesRef(getInitiativesVars);
// Variables can be defined inline as well.
const ref = getInitiativesRef({ orgId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInitiativesRef(dataConnect, getInitiativesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.initiatives);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.initiatives);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `buildup-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateOrganization
You can execute the `CreateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrganizationRef:
```typescript
const name = createOrganizationRef.operationName;
console.log(name);
```

### Variables
The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrganizationVariables {
  name: string;
  uid: string;
}
```
### Return Type
Recall that executing the `CreateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrganizationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrganizationData {
  org: Organization_Key;
  mem: Membership_Key;
}
```
### Using `CreateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrganization, CreateOrganizationVariables } from '@buildup/dataconnect';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  name: ..., 
  uid: ..., 
};

// Call the `createOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrganization(createOrganizationVars);
// Variables can be defined inline as well.
const { data } = await createOrganization({ name: ..., uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrganization(dataConnect, createOrganizationVars);

console.log(data.org);
console.log(data.mem);

// Or, you can use the `Promise` API.
createOrganization(createOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.org);
  console.log(data.mem);
});
```

### Using `CreateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrganizationRef, CreateOrganizationVariables } from '@buildup/dataconnect';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  name: ..., 
  uid: ..., 
};

// Call the `createOrganizationRef()` function to get a reference to the mutation.
const ref = createOrganizationRef(createOrganizationVars);
// Variables can be defined inline as well.
const ref = createOrganizationRef({ name: ..., uid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrganizationRef(dataConnect, createOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.org);
console.log(data.mem);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.org);
  console.log(data.mem);
});
```

## UpdateGenomeMetric
You can execute the `UpdateGenomeMetric` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateGenomeMetric(vars: UpdateGenomeMetricVariables): MutationPromise<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;

interface UpdateGenomeMetricRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGenomeMetricVariables): MutationRef<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;
}
export const updateGenomeMetricRef: UpdateGenomeMetricRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGenomeMetric(dc: DataConnect, vars: UpdateGenomeMetricVariables): MutationPromise<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;

interface UpdateGenomeMetricRef {
  ...
  (dc: DataConnect, vars: UpdateGenomeMetricVariables): MutationRef<UpdateGenomeMetricData, UpdateGenomeMetricVariables>;
}
export const updateGenomeMetricRef: UpdateGenomeMetricRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGenomeMetricRef:
```typescript
const name = updateGenomeMetricRef.operationName;
console.log(name);
```

### Variables
The `UpdateGenomeMetric` mutation requires an argument of type `UpdateGenomeMetricVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGenomeMetricVariables {
  orgId: UUIDString;
  dimension: string;
  metricKey: string;
  metricValue: number;
  provenance?: string | null;
}
```
### Return Type
Recall that executing the `UpdateGenomeMetric` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGenomeMetricData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGenomeMetricData {
  businessGenome_insert: BusinessGenome_Key;
}
```
### Using `UpdateGenomeMetric`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGenomeMetric, UpdateGenomeMetricVariables } from '@buildup/dataconnect';

// The `UpdateGenomeMetric` mutation requires an argument of type `UpdateGenomeMetricVariables`:
const updateGenomeMetricVars: UpdateGenomeMetricVariables = {
  orgId: ..., 
  dimension: ..., 
  metricKey: ..., 
  metricValue: ..., 
  provenance: ..., // optional
};

// Call the `updateGenomeMetric()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGenomeMetric(updateGenomeMetricVars);
// Variables can be defined inline as well.
const { data } = await updateGenomeMetric({ orgId: ..., dimension: ..., metricKey: ..., metricValue: ..., provenance: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGenomeMetric(dataConnect, updateGenomeMetricVars);

console.log(data.businessGenome_insert);

// Or, you can use the `Promise` API.
updateGenomeMetric(updateGenomeMetricVars).then((response) => {
  const data = response.data;
  console.log(data.businessGenome_insert);
});
```

### Using `UpdateGenomeMetric`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGenomeMetricRef, UpdateGenomeMetricVariables } from '@buildup/dataconnect';

// The `UpdateGenomeMetric` mutation requires an argument of type `UpdateGenomeMetricVariables`:
const updateGenomeMetricVars: UpdateGenomeMetricVariables = {
  orgId: ..., 
  dimension: ..., 
  metricKey: ..., 
  metricValue: ..., 
  provenance: ..., // optional
};

// Call the `updateGenomeMetricRef()` function to get a reference to the mutation.
const ref = updateGenomeMetricRef(updateGenomeMetricVars);
// Variables can be defined inline as well.
const ref = updateGenomeMetricRef({ orgId: ..., dimension: ..., metricKey: ..., metricValue: ..., provenance: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGenomeMetricRef(dataConnect, updateGenomeMetricVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.businessGenome_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.businessGenome_insert);
});
```

## CreateInitiative
You can execute the `CreateInitiative` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createInitiative(vars: CreateInitiativeVariables): MutationPromise<CreateInitiativeData, CreateInitiativeVariables>;

interface CreateInitiativeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInitiativeVariables): MutationRef<CreateInitiativeData, CreateInitiativeVariables>;
}
export const createInitiativeRef: CreateInitiativeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInitiative(dc: DataConnect, vars: CreateInitiativeVariables): MutationPromise<CreateInitiativeData, CreateInitiativeVariables>;

interface CreateInitiativeRef {
  ...
  (dc: DataConnect, vars: CreateInitiativeVariables): MutationRef<CreateInitiativeData, CreateInitiativeVariables>;
}
export const createInitiativeRef: CreateInitiativeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInitiativeRef:
```typescript
const name = createInitiativeRef.operationName;
console.log(name);
```

### Variables
The `CreateInitiative` mutation requires an argument of type `CreateInitiativeVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInitiativeVariables {
  orgId: UUIDString;
  title: string;
  description?: string | null;
  department: string;
  ownerId: string;
  expectedRoi?: number | null;
}
```
### Return Type
Recall that executing the `CreateInitiative` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInitiativeData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInitiativeData {
  initiative_insert: Initiative_Key;
}
```
### Using `CreateInitiative`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInitiative, CreateInitiativeVariables } from '@buildup/dataconnect';

// The `CreateInitiative` mutation requires an argument of type `CreateInitiativeVariables`:
const createInitiativeVars: CreateInitiativeVariables = {
  orgId: ..., 
  title: ..., 
  description: ..., // optional
  department: ..., 
  ownerId: ..., 
  expectedRoi: ..., // optional
};

// Call the `createInitiative()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInitiative(createInitiativeVars);
// Variables can be defined inline as well.
const { data } = await createInitiative({ orgId: ..., title: ..., description: ..., department: ..., ownerId: ..., expectedRoi: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInitiative(dataConnect, createInitiativeVars);

console.log(data.initiative_insert);

// Or, you can use the `Promise` API.
createInitiative(createInitiativeVars).then((response) => {
  const data = response.data;
  console.log(data.initiative_insert);
});
```

### Using `CreateInitiative`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInitiativeRef, CreateInitiativeVariables } from '@buildup/dataconnect';

// The `CreateInitiative` mutation requires an argument of type `CreateInitiativeVariables`:
const createInitiativeVars: CreateInitiativeVariables = {
  orgId: ..., 
  title: ..., 
  description: ..., // optional
  department: ..., 
  ownerId: ..., 
  expectedRoi: ..., // optional
};

// Call the `createInitiativeRef()` function to get a reference to the mutation.
const ref = createInitiativeRef(createInitiativeVars);
// Variables can be defined inline as well.
const ref = createInitiativeRef({ orgId: ..., title: ..., description: ..., department: ..., ownerId: ..., expectedRoi: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInitiativeRef(dataConnect, createInitiativeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.initiative_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.initiative_insert);
});
```

