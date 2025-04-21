
export const roles = {
  admin: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canAdd: true,
  },
  viewer: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canAdd: false,
  }

};
