export interface CategoryModel {
    id: string;
    description: string;
    descriptionTranslated: string | null;
    parentId: string | null;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    parent?: CategoryModel | null;
    children?: CategoryModel[];

    // Compatibilidade com mapeamentos do CategoriaService e frontend (idCategory e title)
    idCategory?: string;
    title?: string;
}

export type Category = CategoryModel;

export interface CreateCategoryDTO {
    id: string;
    description: string;
    descriptionTranslated?: string | null;
    parentId?: string | null;
}

export interface UpdateCategoryDTO extends Partial<CreateCategoryDTO> {
    id: string;
}
