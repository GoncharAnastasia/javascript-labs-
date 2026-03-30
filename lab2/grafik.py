import numpy as np
import matplotlib.pyplot as plt

# Дані
x1 = np.array([4, 5, 8, 10, 11], dtype=float)
x2 = np.array([6, 8, 10, 13, 15], dtype=float)
y  = np.array([19, 17, 12, 10, 7], dtype=float)

# Параметри
c = 13
a10 = 1.94292804
a11 = -0.124069479
a20 = 1.013993841
a21 = -0.001402278

# Апроксимовані значення
y_hat = c * (a10 + a11 * x1) * (a20 + a21 * x2)

# Похибка
sse = np.sum((y - y_hat) ** 2)
sigma = np.sqrt(sse)

print("SSE =", sse)
print("sigma =", sigma)

# Поверхня
x1_grid = np.linspace(min(x1), max(x1), 50)
x2_grid = np.linspace(min(x2), max(x2), 50)
X1, X2 = np.meshgrid(x1_grid, x2_grid)

Y = c * (a10 + a11 * X1) * (a20 + a21 * X2)

# Графік
fig = plt.figure(figsize=(10, 7))
ax = fig.add_subplot(111, projection='3d')

# Точки
ax.scatter(x1, x2, y, label='Experimental')
ax.scatter(x1, x2, y_hat, label='Approximated')

# Лінії (це те, що було у викладача)
ax.plot(x1, x2, y, label='Experimental line')
ax.plot(x1, x2, y_hat, label='Approximated line')

# Поверхня
ax.plot_surface(X1, X2, Y, alpha=0.3)

ax.set_xlabel('x1')
ax.set_ylabel('x2')
ax.set_zlabel('y')

ax.legend(loc='center left', bbox_to_anchor=(1.05, 0.5))
plt.show()