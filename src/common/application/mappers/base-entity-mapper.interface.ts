export interface IBaseEntityMapper<DomainEntity, DatabaseEntity> {
  toDomainEntity(entity: DatabaseEntity): DomainEntity;
  toDatabaseEntity(entity: DomainEntity): DatabaseEntity;
}
