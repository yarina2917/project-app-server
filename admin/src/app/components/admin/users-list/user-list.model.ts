export class UserListModel {
  public displayedColumns;
  public usersListColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
  public mediaAccessColumns: string[] = ['select', 'firstName', 'lastName', 'email', 'role'];
  public userId: string
}
