<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;



use Illuminate\Http\Request;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Admin\ClientsController;
use App\Http\Controllers\Admin\StatsController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\PaymentsController;
use App\Http\Controllers\ThemeController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| which is assigned the "api" middleware group.
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Public product endpoints (App clients will use these)
Route::apiResource('/products', ProductsController::class);

// Theme helper: return table/column metadata for frontend themes and table views
Route::get('/theme/tables', [ThemeController::class, 'tables']);

// Admin API routes (unauthenticated for now — add middleware as needed)
Route::prefix('admin')->group(function () {
    Route::get('/stats/overview', [StatsController::class, 'overview']);
    Route::apiResource('/orders', OrdersController::class);
    Route::apiResource('/clients', ClientsController::class);
    Route::apiResource('/products', ProductsController::class);
    Route::apiResource('/payments', PaymentsController::class);
});
