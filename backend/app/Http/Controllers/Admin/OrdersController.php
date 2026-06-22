<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrdersController extends Controller
{
    public function index()
    {
        return response()->json(Order::orderBy('date','desc')->get());
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'order_id' => 'required|string',
            'client_id' => 'nullable|integer',
            'product' => 'required|string',
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'date' => 'required|date'
        ]);

        $order = Order::create($data);
        return response()->json($order, 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $data = $request->validate([
            'product' => 'sometimes|string',
            'amount' => 'sometimes|numeric',
            'status' => 'sometimes|string',
            'date' => 'sometimes|date'
        ]);
        $order->update($data);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['message' => 'Order deleted']);
    }
}
