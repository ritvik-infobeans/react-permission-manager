import React, { createContext, useContext, useState, useEffect } from 'react';

export const PermissionsContext = createContext();

let permissionsState = {
  roles: [],
  permissions: {},
  defaultRoles: [],
};

export const configurePermissions = ({ roles = [], permissions = {}, defaultRoles = [] }) => {
  permissionsState = { roles, permissions, defaultRoles };
  return permissionsState;
};

export const setUserRole = (userRole) => {
  configurePermissions({
    roles: [userRole],
    defaultRoles: [userRole],
  });
};

export const setPermissions = (dynamicPermissions) => {
  configurePermissions({
    roles: permissionsState.roles,
    permissions: dynamicPermissions,
    defaultRoles: permissionsState.defaultRoles,
  });
};

export const PermissionsProvider = ({ children }) => {
  const [state, setState] = useState(permissionsState);

  useEffect(() => {
    setState(permissionsState);
  }, []);

  return (
    <PermissionsContext.Provider value={state}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermission = (requiredPermission, getUserRolesFn) => {
  const contextValue = useContext(PermissionsContext);

  if (!contextValue || !contextValue.roles || !contextValue.permissions) {
    console.error('Permissions not configured. Make sure to use PermissionsProvider.');
    return false;
  }

  const { roles, permissions } = contextValue;
  const userRoles = getUserRolesFn ? getUserRolesFn() : roles;

  return userRoles.some((role) => permissions[role]?.includes(requiredPermission));
};
