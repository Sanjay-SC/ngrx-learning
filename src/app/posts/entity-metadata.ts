import { EntityMetadataMap } from "@ngrx/data";

export const entityMetadata: EntityMetadataMap = {
    Post: {
        entityDispatcherOptions: {
            optimisticUpdate: true,
            optimisticDelete: false
        }
    },
};

export const entityConfig = {
    entityMetadata
}