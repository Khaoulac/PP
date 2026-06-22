<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductsController extends Controller
{
    public function index()
    {
        return response()->json(Product::orderBy('name')->get());
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'sku' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category' => 'nullable|string',
            'stock' => 'nullable|integer',
            'status' => 'nullable|string',
            'image_url' => 'nullable|string',
        ]);

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
            'sku' => 'sometimes|string',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'category' => 'sometimes|string',
            'stock' => 'sometimes|integer',
            'status' => 'sometimes|string',
            'image_url' => 'sometimes|string',
        ]);
        $product->update($data);
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
