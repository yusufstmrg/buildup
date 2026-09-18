const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'buildup-connector',
  service: 'buildup-data-connect',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

const createOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrganization', inputVars);
}
createOrganizationRef.operationName = 'CreateOrganization';
exports.createOrganizationRef = createOrganizationRef;

exports.createOrganization = function createOrganization(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrganizationRef(dcInstance, inputVars));
}
;

const updateGenomeMetricRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGenomeMetric', inputVars);
}
updateGenomeMetricRef.operationName = 'UpdateGenomeMetric';
exports.updateGenomeMetricRef = updateGenomeMetricRef;

exports.updateGenomeMetric = function updateGenomeMetric(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateGenomeMetricRef(dcInstance, inputVars));
}
;

const createInitiativeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInitiative', inputVars);
}
createInitiativeRef.operationName = 'CreateInitiative';
exports.createInitiativeRef = createInitiativeRef;

exports.createInitiative = function createInitiative(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInitiativeRef(dcInstance, inputVars));
}
;

const getUserOrganizationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserOrganizations', inputVars);
}
getUserOrganizationsRef.operationName = 'GetUserOrganizations';
exports.getUserOrganizationsRef = getUserOrganizationsRef;

exports.getUserOrganizations = function getUserOrganizations(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserOrganizationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getBusinessProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBusinessProfile', inputVars);
}
getBusinessProfileRef.operationName = 'GetBusinessProfile';
exports.getBusinessProfileRef = getBusinessProfileRef;

exports.getBusinessProfile = function getBusinessProfile(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getBusinessProfileRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getBusinessGenomeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBusinessGenome', inputVars);
}
getBusinessGenomeRef.operationName = 'GetBusinessGenome';
exports.getBusinessGenomeRef = getBusinessGenomeRef;

exports.getBusinessGenome = function getBusinessGenome(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getBusinessGenomeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getInitiativesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInitiatives', inputVars);
}
getInitiativesRef.operationName = 'GetInitiatives';
exports.getInitiativesRef = getInitiativesRef;

exports.getInitiatives = function getInitiatives(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getInitiativesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
