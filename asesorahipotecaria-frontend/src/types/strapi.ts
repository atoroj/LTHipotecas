export interface StrapiEntity {
    id: number;
    documentId?: string; // Es opcional ya que puede no estar en todas las respuestas
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

// Contenido de la Página de Inicio
export interface InicioAttributes {
    TituloPrincipal: string;
    Subtitulo: string;
    // ... otros campos de la página de inicio
}

// Content Types (combinando Base + Atributos)
export interface InicioContent extends StrapiEntity, InicioAttributes { }

// El Envoltorio de la API 
export interface StrapiSingleResponse<T> {
    data: T;
    meta: {};
}