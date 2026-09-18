# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createOrganization, updateGenomeMetric, createInitiative, getUserOrganizations, getBusinessProfile, getBusinessGenome, getInitiatives } from '@buildup/dataconnect';


// Operation CreateOrganization:  For variables, look at type CreateOrganizationVars in ../index.d.ts
const { data } = await CreateOrganization(dataConnect, createOrganizationVars);

// Operation UpdateGenomeMetric:  For variables, look at type UpdateGenomeMetricVars in ../index.d.ts
const { data } = await UpdateGenomeMetric(dataConnect, updateGenomeMetricVars);

// Operation CreateInitiative:  For variables, look at type CreateInitiativeVars in ../index.d.ts
const { data } = await CreateInitiative(dataConnect, createInitiativeVars);

// Operation GetUserOrganizations:  For variables, look at type GetUserOrganizationsVars in ../index.d.ts
const { data } = await GetUserOrganizations(dataConnect, getUserOrganizationsVars);

// Operation GetBusinessProfile:  For variables, look at type GetBusinessProfileVars in ../index.d.ts
const { data } = await GetBusinessProfile(dataConnect, getBusinessProfileVars);

// Operation GetBusinessGenome:  For variables, look at type GetBusinessGenomeVars in ../index.d.ts
const { data } = await GetBusinessGenome(dataConnect, getBusinessGenomeVars);

// Operation GetInitiatives:  For variables, look at type GetInitiativesVars in ../index.d.ts
const { data } = await GetInitiatives(dataConnect, getInitiativesVars);


```