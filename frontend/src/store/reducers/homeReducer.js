import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks (unchanged)
export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-categorys');
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/get-products');
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, { fulfillWithValue }) => {
        try {
            const { data } = await api.get('/home/price-range-latest-product');
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

export const product_details = createAsyncThunk(
    'product/product_details',
    async (slug, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/product-details/${slug}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, { fulfillWithValue }) => {
        try {
            const { data } = await api.post('/home/customer/submit-review', info);
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({ productId, pageNumber }, { fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`);
            return fulfillWithValue(data);
        } catch (error) {
            console.log(error.response);
        }
    }
);

export const homeReducer = createSlice({
    name: 'home',
    initialState: {
        categorys: [],
        products: [],
        totalProduct: 0,
        parPage: 3,
        latest_product: [],
        topRated_product: [],
        discount_product: [],
        priceRange: {
            low: 0,
            high: 100
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        errorMessage: '',
        successMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews: []  // Ensure this is initialized correctly
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_category.fulfilled, (state, { payload }) => {
                state.categorys = payload.categorys || [];
            })
            .addCase(get_products.fulfilled, (state, { payload }) => {
                state.products = payload.products || [];
                state.latest_product = payload.latest_product || [];
                state.topRated_product = payload.topRated_product || [];
                state.discount_product = payload.discount_product || [];
            })
            .addCase(price_range_product.fulfilled, (state, { payload }) => {
                state.latest_product = payload.latest_product || [];
                state.priceRange = payload.priceRange || state.priceRange;
            })
            .addCase(query_products.fulfilled, (state, { payload }) => {
                state.products = payload.products || [];
                state.totalProduct = payload.totalProduct || 0;
                state.parPage = payload.parPage || state.parPage;
            })
            .addCase(product_details.fulfilled, (state, { payload }) => {
                state.product = payload.product || {};
                state.relatedProducts = payload.relatedProducts || [];
                state.moreProducts = payload.moreProducts || [];
            })
            .addCase(customer_review.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message || '';
            })
            .addCase(get_reviews.fulfilled, (state, { payload }) => {
                state.reviews = payload.reviews || [];
                state.totalReview = payload.totalReview || 0;
                state.rating_review = payload.rating_review || [];
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.errorMessage = action.error.message;
                }
            );
    }
});

export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
