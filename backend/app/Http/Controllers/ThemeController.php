<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ThemeController extends Controller
{
    /**
     * Return simple table metadata (fields and labels) to help frontend themes
     * render tables when connecting to the API.
     */
    public function tables(Request $request)
    {
        $tables = [
            'products' => [
                ['key' => 'id', 'label' => 'ID'],
                ['key' => 'name', 'label' => 'Name'],
                ['key' => 'sku', 'label' => 'SKU'],
                ['key' => 'price', 'label' => 'Price'],
                ['key' => 'category', 'label' => 'Category'],
                ['key' => 'stock', 'label' => 'Stock'],
                ['key' => 'status', 'label' => 'Status'],
                ['key' => 'image', 'label' => 'Image'],
            ],
            'orders' => [
                ['key' => 'id', 'label' => 'ID'],
                ['key' => 'order_id', 'label' => 'Order ID'],
                ['key' => 'client_id', 'label' => 'Client ID'],
                ['key' => 'product', 'label' => 'Products'],
                ['key' => 'amount', 'label' => 'Amount'],
                ['key' => 'status', 'label' => 'Status'],
                ['key' => 'date', 'label' => 'Date'],
            ],
        ];

        return response()->json($tables);
    }
}
