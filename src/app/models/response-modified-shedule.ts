export interface ResponsemodifiedSchedules {
  modifiedSchedules: ModifiedSchedule[];
}

export interface ModifiedSchedule {
  createdAt:  Date;
  id:         string;
  modifiedBy: ModifiedBy;
  updatedAt:  Date;
}

export interface ModifiedBy {
  password:  string;
  role:      string;
  lastName:  string;
  updatedAt: Date;
  createdAt: Date;
  id:        string;
  email:     string;
  name:      string;
}
